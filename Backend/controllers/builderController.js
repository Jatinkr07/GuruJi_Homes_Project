// controllers/builderController.js
import Builder from "../models/Builder.js";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBuilder = async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files || {};

    console.log("createBuilder - req.body:", req.body, "req.files:", req.files); // Debug log

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!files.image || !files.image[0]) {
      return res
        .status(400)
        .json({ message: "Image is required for new builder" });
    }

    const builderData = {
      name,
      image: files.image[0].path,
    };

    const builder = new Builder(builderData);
    const savedBuilder = await builder.save();
    res.status(201).json(savedBuilder);
  } catch (error) {
    console.error("Error in createBuilder:", error);
    res.status(400).json({ message: error.message });
  }
};
export const updateBuilder = async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.id);
    if (!builder) return res.status(404).json({ message: "Builder not found" });

    const { name } = req.body;
    const files = req.files || {};
    const updatedData = { name: name || builder.name };

    if (files.image && files.image[0]) {
      if (builder.image) {
        const oldImagePath = path.join(__dirname, "../", builder.image);
        if (fs.existsSync(oldImagePath)) {
          await fsPromises.unlink(oldImagePath);
        }
      }
      updatedData.image = files.image[0].path;
    } else {
      updatedData.image = builder.image;
    }

    const updatedBuilder = await Builder.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedBuilder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBuilders = async (req, res) => {
  try {
    const builders = await Builder.find().sort({ createdAt: -1 });
    res.json(builders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBuilder = async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.id);
    if (!builder) return res.status(404).json({ message: "Builder not found" });

    if (builder.image) {
      const imagePath = path.join(__dirname, "../", builder.image);
      if (fs.existsSync(imagePath)) {
        await fsPromises.unlink(imagePath);
        console.log(`Deleted builder image: ${imagePath}`);
      }
    }

    await Builder.findByIdAndDelete(req.params.id);
    res.json({ message: "Builder deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBuilder:", error);
    res.status(500).json({ message: error.message });
  }
};
