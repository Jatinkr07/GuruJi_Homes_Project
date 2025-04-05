import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/nodemailer.js";

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    await sendEmail(req.body, "contact");
    res.status(201).json({ message: "Contact submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getContacts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const contacts = await Contact.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Contact.countDocuments();
    res.json({ contacts, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
