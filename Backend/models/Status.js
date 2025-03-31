import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  text: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Status", StatusSchema);
