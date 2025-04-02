// middleware/Uploads.js
import busboy from "busboy";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPaths = {
  builder: path.join(__dirname, "../uploads/builder"),
  type: path.join(__dirname, "../uploads/type"),
  status: path.join(__dirname, "../uploads/status"),
  projects: path.join(__dirname, "../uploads/projects"),
};

const createUploadDir = async (dir) => {
  try {
    await fsPromises.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory ${dir}:`, err);
  }
};

Promise.all(Object.values(uploadPaths).map(createUploadDir)).catch((err) =>
  console.error("Directory creation failed:", err)
);

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
    limits: { fileSize: 10 * 1024 * 1024, files: 100 },
  });

  req.body = {};
  req.files = {};

  bb.on("file", (fieldname, file, info) => {
    const { filename, mimeType } = info;

    const normalizedPath = req.path
      .toLowerCase()
      .split("?")[0]
      .replace(/\/$/, "");
    const entity =
      Object.keys(uploadPaths).find((key) =>
        normalizedPath.startsWith(`/${key}s`)
      ) || "projects";

    const uploadDir = uploadPaths[entity];
    const uniqueName = `${Date.now()}-${filename.replace(/\s+/g, "-")}`;
    const saveTo = path.join(uploadDir, uniqueName);
    const tempPath = path.join(uploadDir, `temp-${uniqueName}`);

    const fileData = {
      fieldname,
      originalname: filename,
      mimetype: mimeType,
      path: path.relative(path.join(__dirname, "../"), saveTo), // Relative path
      size: 0,
    };

    console.log(
      `Uploading to: ${entity}, Path: ${saveTo}, MIME: ${mimeType}, Field: ${fieldname}`
    );

    const isImage = supportedImageTypes.includes(mimeType);
    const writeStream = fs.createWriteStream(tempPath);

    if (isImage) {
      let shouldProcessWithSharp = true;
      file.pipe(writeStream);

      file.on("end", async () => {
        try {
          const metadata = await sharp(tempPath)
            .metadata()
            .catch((err) => {
              console.warn(
                `Invalid image format for ${filename}:`,
                err.message
              );
              shouldProcessWithSharp = false;
            });

          if (shouldProcessWithSharp && metadata) {
            await sharp(tempPath)
              .resize({ width: 1200, withoutEnlargement: true })
              .jpeg({ quality: 80 })
              .toFile(saveTo);
            await fsPromises.unlink(tempPath);
          } else {
            await fsPromises.rename(tempPath, saveTo); // Fixed typo here
          }

          req.files[fieldname] = req.files[fieldname] || [];
          req.files[fieldname].push(fileData);
        } catch (err) {
          console.error(`Error processing ${filename}:`, err);
          await fsPromises.unlink(tempPath).catch(() => {});
          if (fs.existsSync(tempPath)) {
            await fsPromises.rename(tempPath, saveTo); // Fixed typo here
            req.files[fieldname] = req.files[fieldname] || [];
            req.files[fieldname].push(fileData);
          }
        }
      });
    } else {
      file.pipe(writeStream);
      file.on("end", async () => {
        await fsPromises.rename(tempPath, saveTo); // Fixed typo here
        req.files[fieldname] = req.files[fieldname] || [];
        req.files[fieldname].push(fileData);
      });
    }

    file.on("data", (data) => (fileData.size += data.length));
    file.on("error", (err) => {
      console.error(`File stream error for ${filename}:`, err);
      fsPromises.unlink(tempPath).catch(() => {});
    });
  });

  bb.on("field", (name, value) => {
    req.body[name] = value;
  });

  bb.on("finish", () => {
    console.log("Busboy finished, req.files:", req.files);
    next();
  });

  bb.on("error", (err) => {
    console.error("Busboy error:", err);
    next(err);
  });

  req.pipe(bb);
};

export default Uploads;
