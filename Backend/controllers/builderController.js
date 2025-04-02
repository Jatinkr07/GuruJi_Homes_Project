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
    console.log("req.files in createBuilder:", files); // Debug log

    const builderData = { name };

    if (files.image && files.image[0]) {
      builderData.image = files.image[0].path; // Store relative path
      console.log(`Saving builder image path: ${builderData.image}`);
    } else {
      console.log("No image provided for builder creation");
    }

    const builder = new Builder(builderData);
    const savedBuilder = await builder.save();
    console.log("Saved builder:", savedBuilder); // Debug log
    res.status(201).json(savedBuilder);
  } catch (error) {
    console.error("Error in createBuilder:", error);
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

    if (files.image && files.image[0]) {
      if (builder.image) {
        const oldImagePath = path.join(__dirname, "../", builder.image);
        if (fs.existsSync(oldImagePath)) {
          await fsPromises.unlink(oldImagePath);
          console.log(`Deleted old builder image: ${oldImagePath}`);
        }
      }
      updatedData.image = files.image[0].path; // Store new relative path
      console.log(`Updating builder image path: ${updatedData.image}`);
    }

    const updatedBuilder = await Builder.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedBuilder);
  } catch (error) {
    console.error("Error in updateBuilder:", error);
    res.status(400).json({ message: error.message });
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
