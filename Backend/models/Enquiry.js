import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Enquiry", enquirySchema);
