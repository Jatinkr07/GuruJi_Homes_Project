import Project from "../models/Project.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProject = async (req, res) => {
  try {
    const {
      title,
      builder,
      type,
      status,
      location,
      price,
      description,
      amenities,
    } = req.body;
    const files = req.files || {};

    const projectData = {
      title,
      builder,
      type,
      status,
      location,
      price: Number(price),
      description,
      amenities: JSON.parse(amenities),
      images: files.images
        ? files.images.map(
            (file) => `uploads/projects/${path.basename(file.path)}`
          )
        : [],
      floorPlan: files.floorPlan
        ? files.floorPlan.map(
            (file) => `uploads/projects/${path.basename(file.path)}`
          )
        : [],
      sitePlan: files.sitePlan
        ? files.sitePlan.map(
            (file) => `uploads/projects/${path.basename(file.path)}`
          )
        : [],
      brochure: files.brochure
        ? `uploads/projects/${path.basename(files.brochure[0].path)}`
        : undefined,
    };

    const project = new Project(projectData);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("builder", "name")
      .populate("type", "name")
      .populate("status", "text")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const {
      title,
      builder,
      type,
      status,
      location,
      price,
      description,
      amenities,
    } = req.body;
    const files = req.files || {};

    const updatedData = {
      title: title || project.title,
      builder: builder || project.builder,
      type: type || project.type,
      status: status || project.status,
      location: location || project.location,
      price: Number(price) || project.price,
      description: description || project.description,
      amenities: amenities ? JSON.parse(amenities) : project.amenities,
    };

    // Handle file updates
    if (files.images) {
      project.images.forEach((img) =>
        fs.unlink(
          path.join(__dirname, "../", img),
          (err) => err && console.error(err)
        )
      );
      updatedData.images = files.images.map(
        (file) => `uploads/projects/${path.basename(file.path)}`
      );
    } else {
      updatedData.images = project.images;
    }

    if (files.floorPlan) {
      project.floorPlan.forEach((img) =>
        fs.unlink(
          path.join(__dirname, "../", img),
          (err) => err && console.error(err)
        )
      );
      updatedData.floorPlan = files.floorPlan.map(
        (file) => `uploads/projects/${path.basename(file.path)}`
      );
    } else {
      updatedData.floorPlan = project.floorPlan;
    }

    if (files.sitePlan) {
      project.sitePlan.forEach((img) =>
        fs.unlink(
          path.join(__dirname, "../", img),
          (err) => err && console.error(err)
        )
      );
      updatedData.sitePlan = files.sitePlan.map(
        (file) => `uploads/projects/${path.basename(file.path)}`
      );
    } else {
      updatedData.sitePlan = project.sitePlan;
    }

    if (files.brochure) {
      if (project.brochure)
        fs.unlink(
          path.join(__dirname, "../", project.brochure),
          (err) => err && console.error(err)
        );
      updatedData.brochure = `uploads/projects/${path.basename(
        files.brochure[0].path
      )}`;
    } else {
      updatedData.brochure = project.brochure;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    )
      .populate("builder", "name")
      .populate("type", "name")
      .populate("status", "text");
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    [
      ...project.images,
      ...project.floorPlan,
      ...project.sitePlan,
      project.brochure,
    ]
      .filter(Boolean)
      .forEach((file) =>
        fs.unlink(
          path.join(__dirname, "../", file),
          (err) => err && console.error(err)
        )
      );

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
