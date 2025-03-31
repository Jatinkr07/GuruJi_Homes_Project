import mongoose from "mongoose";

const BuilderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Builder", BuilderSchema);
