// controllers/typeController.js
import Type from "../models/Type.js";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createType = async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files || {};

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!files.image || !files.image[0]) {
      return res
        .status(400)
        .json({ message: "Image is required for new type" });
    }

    const typeData = {
      name,
      image: files.image[0].path,
    };

    const type = new Type(typeData);
    const savedType = await type.save();
    res.status(201).json(savedType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(404).json({ message: "Type not found" });

    const { name } = req.body;
    const files = req.files || {};
    const updatedData = { name: name || type.name };

    if (files.image && files.image[0]) {
      if (type.image) {
        const oldImagePath = path.join(__dirname, "../", type.image);
        if (fs.existsSync(oldImagePath)) {
          await fsPromises.unlink(oldImagePath);
        }
      }
      updatedData.image = files.image[0].path;
    } else {
      updatedData.image = type.image; // Retain existing image if no new one is uploaded
    }

    const updatedType = await Type.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTypes = async (req, res) => {
  try {
    const types = await Type.find().sort({ createdAt: -1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(404).json({ message: "Type not found" });

    if (type.image) {
      const imagePath = path.join(__dirname, "../", type.image);
      if (fs.existsSync(imagePath)) {
        await fsPromises.unlink(imagePath);
      }
    }

    await Type.findByIdAndDelete(req.params.id);
    res.json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
