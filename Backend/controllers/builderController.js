import Builder from "../models/Builder.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBuilder = async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files || {};
    const builderData = { name };

    if (files.image) {
      builderData.image = `uploads/builder/${path.basename(
        files.image[0].path
      )}`;
    }

    const builder = new Builder(builderData);
    const savedBuilder = await builder.save();
    res.status(201).json(savedBuilder);
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

export const updateBuilder = async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.id);
    if (!builder) return res.status(404).json({ message: "Builder not found" });

    const { name } = req.body;
    const files = req.files || {};
    const updatedData = { name: name || builder.name };

    if (files.image) {
      fs.unlink(path.join(__dirname, "../", builder.image), (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
      updatedData.image = `uploads/builder/${path.basename(
        files.image[0].path
      )}`;
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

export const deleteBuilder = async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.id);
    if (!builder) return res.status(404).json({ message: "Builder not found" });

    if (builder.image) {
      fs.unlink(path.join(__dirname, "../", builder.image), (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await Builder.findByIdAndDelete(req.params.id);
    res.json({ message: "Builder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
