import busboy from "busboy";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../uploads/category/");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const Uploads = (req, res, next) => {
  const bb = busboy({ headers: req.headers });
  req.body = {};
  let filePath;

  bb.on("file", (fieldname, file, filename) => {
    filePath = path.join(uploadPath, `${Date.now()}-${filename.filename}`);
    file.pipe(fs.createWriteStream(filePath));
    req.body.image = filePath
      ? path.relative(__dirname + "/../", filePath)
      : undefined;
  });

  bb.on("field", (name, value) => {
    try {
      req.body[name] = name === "subCategories" ? JSON.parse(value) : value;
    } catch (error) {
      req.body[name] = value;
    }
  });

  bb.on("finish", () => {
    req.filePath = filePath;
    next();
  });

  bb.on("error", (error) => {
    next(error);
  });

  req.pipe(bb);
};

export default Uploads;
