import express from "express";
import {
  createProject,
  getProjects,
  // getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import Uploads from "../middleware/Uploads.js";

const router = express.Router();

router.post("/", Uploads, createProject);
router.get("/", getProjects);
// router.get("/:id", getProjectById);
router.put("/:id", Uploads, updateProject);
router.delete("/:id", deleteProject);

export default router;
