import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import Uploads from "../middleware/Uploads.js";

const router = express.Router();

router.post("/", Uploads, createCategory);
router.get("/", getCategories);
router.put("/:id", Uploads, updateCategory);
router.delete("/:id", deleteCategory);

export default router;
