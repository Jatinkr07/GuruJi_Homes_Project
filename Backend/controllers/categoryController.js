import Category from "../models/Category.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      image: req.body.image,
      subCategories: req.body.subCategories || [],
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.filePath && category.image) {
      fs.unlinkSync(path.join(__dirname, "../", category.image));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || category.name,
        image: req.body.image || category.image,
        subCategories: req.body.subCategories || category.subCategories,
      },
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.image) {
      fs.unlinkSync(path.join(__dirname, "../", category.image));
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
