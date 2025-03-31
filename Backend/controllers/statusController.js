import Status from "../models/Status.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createStatus = async (req, res) => {
  try {
    const { text } = req.body;
    const statusData = { text };

    const status = new Status(statusData);
    const savedStatus = await status.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find().sort({ createdAt: -1 });
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) return res.status(404).json({ message: "Status not found" });

    const { text } = req.body;
    const updatedData = { text: text || status.text };

    const updatedStatus = await Status.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) return res.status(404).json({ message: "Status not found" });

    await Status.findByIdAndDelete(req.params.id);
    res.json({ message: "Status deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
