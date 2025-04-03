import Project from "../models/Project.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Controller for Create Project

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
      highlight,
      floorPlanText,
    } = req.body;
    const files = req.files || {};

    console.log("createProject - req.body:", req.body, "req.files:", req.files);

    if (
      !title ||
      !builder ||
      !type ||
      !status ||
      !location ||
      !price ||
      !description
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }
    if (!files.bannerImage || !files.bannerImage.length) {
      return res
        .status(400)
        .json({ message: "Banner image is required for new project" });
    }
    if (!files.images || !files.images.length) {
      return res
        .status(400)
        .json({ message: "At least one project image is required" });
    }

    const floorPlanCaptions = floorPlanText ? JSON.parse(floorPlanText) : [];

    const projectData = {
      title,
      builder,
      type,
      status,
      location,
      price: Number(price),
      description,
      amenities: JSON.parse(amenities),
      highlight: highlight ? JSON.parse(highlight) : [],
      images: files.images.map(
        (file) => `uploads/projects/${path.basename(file.path)}`
      ),
      floorPlan: files.floorPlan
        ? files.floorPlan.map((file, index) => ({
            image: `uploads/projects/${path.basename(file.path)}`,
            text: floorPlanCaptions[index] || `Floor Plan ${index + 1}`,
          }))
        : [],
      sitePlan: files.sitePlan
        ? files.sitePlan.map(
            (file) => `uploads/projects/${path.basename(file.path)}`
          )
        : [],
      brochure: files.brochure
        ? `uploads/projects/${path.basename(files.brochure[0].path)}`
        : undefined,
      bannerImage: files.bannerImage
        ? `uploads/projects/${path.basename(files.bannerImage[0].path)}`
        : undefined,
    };

    const project = new Project(projectData);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error in createProject:", error);
    res.status(400).json({ message: error.message });
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
      highlight,
      floorPlanText,
      existingImages,
      existingFloorPlan,
      existingSitePlan,
      existingBrochure,
      existingBannerImage,
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
      highlight: highlight ? JSON.parse(highlight) : project.highlight,
    };

    const floorPlanCaptions = floorPlanText ? JSON.parse(floorPlanText) : [];

    // Handle images
    const existingImagePaths = existingImages ? JSON.parse(existingImages) : [];
    if (files.images && files.images.length > 0) {
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
      updatedData.images =
        existingImagePaths.length > 0 ? existingImagePaths : project.images;
    }

    // Handle floor plans
    const existingFloorPlanData = existingFloorPlan
      ? JSON.parse(existingFloorPlan)
      : [];
    if (files.floorPlan && files.floorPlan.length > 0) {
      project.floorPlan.forEach((fp) =>
        fs.unlink(
          path.join(__dirname, "../", fp.image),
          (err) => err && console.error(err)
        )
      );
      updatedData.floorPlan = files.floorPlan.map((file, index) => ({
        image: `uploads/projects/${path.basename(file.path)}`,
        text:
          floorPlanCaptions[index] ||
          existingFloorPlanData[index]?.text ||
          `Floor Plan ${index + 1}`,
      }));
    } else {
      updatedData.floorPlan =
        existingFloorPlanData.length > 0
          ? existingFloorPlanData
          : project.floorPlan;
    }

    // Handle site plans
    const existingSitePlanPaths = existingSitePlan
      ? JSON.parse(existingSitePlan)
      : [];
    if (files.sitePlan && files.sitePlan.length > 0) {
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
      updatedData.sitePlan =
        existingSitePlanPaths.length > 0
          ? existingSitePlanPaths
          : project.sitePlan;
    }

    // Handle brochure
    if (files.brochure && files.brochure.length > 0) {
      if (project.brochure) {
        fs.unlink(
          path.join(__dirname, "../", project.brochure),
          (err) => err && console.error(err)
        );
      }
      updatedData.brochure = `uploads/projects/${path.basename(
        files.brochure[0].path
      )}`;
    } else {
      updatedData.brochure = existingBrochure || project.brochure;
    }

    // Handle banner image
    if (files.bannerImage && files.bannerImage.length > 0) {
      if (project.bannerImage) {
        fs.unlink(
          path.join(__dirname, "../", project.bannerImage),
          (err) => err && console.error(err)
        );
      }
      updatedData.bannerImage = `uploads/projects/${path.basename(
        files.bannerImage[0].path
      )}`;
    } else {
      updatedData.bannerImage = existingBannerImage || project.bannerImage;
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
    console.error("Error in updateProject:", error);
    res.status(400).json({ message: error.message });
  }
};

//Controller for Delete Project data from database

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const filesToDelete = [
      ...project.images,
      ...(project.floorPlan.map((fp) => fp.image) || []),
      ...(project.sitePlan || []),
      project.brochure,
      project.bannerImage,
    ].filter(Boolean);

    // Delete files from the filesystem
    filesToDelete.forEach((filePath) => {
      const fullPath = path.join(__dirname, "../", filePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error(`Failed to delete file ${fullPath}:`, err);
      });
    });

    // Delete the project from the database
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProject:", error);
    res.status(500).json({ message: error.message });
  }
};

//Controller for Get Project data
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

//Controller for individual Get Project data
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("builder", "name")
      .populate("type", "name")
      .populate("status", "text");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
