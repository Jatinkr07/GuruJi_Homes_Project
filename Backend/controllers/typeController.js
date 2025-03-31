import Type from "../models/Type.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createType = async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files || {};
    const typeData = { name };

    if (files.image) {
      typeData.image = `uploads/type/${path.basename(files.image[0].path)}`;
    }

    const type = new Type(typeData);
    const savedType = await type.save();
    res.status(201).json(savedType);
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

export const updateType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(404).json({ message: "Type not found" });

    const { name } = req.body;
    const files = req.files || {};
    const updatedData = { name: name || type.name };

    if (files.image) {
      if (type.image) {
        fs.unlink(path.join(__dirname, "../", type.image), (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      updatedData.image = `uploads/type/${path.basename(files.image[0].path)}`;
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

export const deleteType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(404).json({ message: "Type not found" });

    if (type.image) {
      fs.unlink(path.join(__dirname, "../", type.image), (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await Type.findByIdAndDelete(req.params.id);
    res.json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
