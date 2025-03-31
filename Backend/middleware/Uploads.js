// middleware/uploads.js
import busboy from "busboy";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUploadDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const uploadPaths = {
  builder: path.join(__dirname, "../uploads/builder"),
  type: path.join(__dirname, "../uploads/type"),
  status: path.join(__dirname, "../uploads/status"),
};

Object.values(uploadPaths).forEach(createUploadDir);

const Uploads = (req, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return next();
  }

  const bb = busboy({
    headers: req.headers,
    limits: { fileSize: 5 * 1024 * 1024, files: 10 },
  });

  req.body = {};
  req.files = {};

  bb.on("file", (fieldname, file, info) => {
    const { filename, mimeType } = info;
    const entity = req.path.includes("builder")
      ? "builder"
      : req.path.includes("type")
      ? "type"
      : "status";
    const uniqueName = `${Date.now()}-${filename.replace(/\s+/g, "-")}`;
    const saveTo = path.join(uploadPaths[entity], uniqueName);

    const fileData = {
      fieldname,
      originalname: filename,
      mimetype: mimeType,
      path: saveTo,
      size: 0,
    };

    const writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);

    file.on("data", (data) => (fileData.size += data.length));
    file.on("end", () => {
      if (!req.files[fieldname]) req.files[fieldname] = [];
      req.files[fieldname].push(fileData);
    });
    file.on("error", () => fs.unlinkSync(saveTo));
  });

  bb.on("field", (name, value) => (req.body[name] = value));
  bb.on("finish", next);
  bb.on("error", next);

  req.pipe(bb);
};

export default Uploads;
