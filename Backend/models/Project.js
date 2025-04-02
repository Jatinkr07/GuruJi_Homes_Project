import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  builder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Builder",
    required: true,
  },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [{ type: String }],
  images: [{ type: String }],
  floorPlan: [{ type: String }],
  sitePlan: [{ type: String }],
  highlight: [{ type: String }],
  bannerImage: { type: String },
  brochure: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", ProjectSchema);
