import Enquiry from "../models/Enquiry.js";
import { sendEmail } from "../utils/nodemailer.js";
import Project from "../models/Project.js";

export const createEnquiry = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    await sendEmail(req.body, "enquiry");
    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getEnquiries = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const enquiries = await Enquiry.find()
      .populate("projectId", "title")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Enquiry.countDocuments();
    res.json({ enquiries, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
