import busboy from "busboy";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPaths = {
  builders: path.join(__dirname, "../uploads/builders"),
  types: path.join(__dirname, "../uploads/types"),
  status: path.join(__dirname, "../uploads/status"),
  projects: path.join(__dirname, "../uploads/projects"),
};

Object.values(uploadPaths).forEach(async (dir) => {
  await fsPromises
    .mkdir(dir, { recursive: true })
    .catch((err) => console.error(`Failed to create directory ${dir}:`, err));
});

const supportedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const Uploads = (req, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return next();
  }

  const bb = busboy({
    headers: req.headers,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  });

  req.body = {};
  req.files = {};

  const getEntityFromPath = (path) => {
    if (path.startsWith("/builders")) return "builders";
    if (path.startsWith("/types")) return "types";
    if (path.startsWith("/status")) return "status";
    return "projects";
  };

  const filePromises = [];

  bb.on("file", (fieldname, file, info) => {
    const { filename, mimeType } = info;
    const entity = getEntityFromPath(req.path.toLowerCase());
    const uploadDir = uploadPaths[entity];

    if (!uploadDir) {
      file.resume();
      return next(new Error("Invalid upload directory"));
    }

    const uniqueName = `${Date.now()}-${filename.replace(/\s+/g, "-")}`;
    const saveTo = path.join(uploadDir, uniqueName);

    const fileData = {
      fieldname,
      originalname: filename,
      mimetype: mimeType,
      path: path.relative(path.join(__dirname, "../"), saveTo),
      size: 0,
    };

    const writeStream = fs.createWriteStream(saveTo);
    const filePromise = new Promise((resolve, reject) => {
      // Handle both images and PDFs without modification
      if (
        supportedImageTypes.includes(mimeType) ||
        (mimeType === "application/pdf" && fieldname === "brochure")
      ) {
        file.pipe(writeStream);
      } else {
        file.resume();
        resolve();
        return;
      }

      writeStream.on("finish", () => {
        req.files[fieldname] = req.files[fieldname] || [];
        req.files[fieldname].push(fileData);
        resolve();
      });
      writeStream.on("error", (err) => {
        console.error(`Error writing file ${filename}:`, err);
        reject(err);
      });
    });
    filePromises.push(filePromise);

    file.on("data", (data) => (fileData.size += data.length));
    file.on("error", (err) =>
      console.error(`File stream error for ${filename}:`, err)
    );
  });

  bb.on("field", (name, value) => {
    req.body[name] = value;
  });

  bb.on("finish", async () => {
    try {
      await Promise.all(filePromises);
      next();
    } catch (err) {
      next(err);
    }
  });

  bb.on("error", (err) => {
    console.error("Busboy error:", err);
    next(err);
  });

  req.pipe(bb);
};

export default Uploads;
