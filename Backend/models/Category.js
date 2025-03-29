import mongoose from "mongoose";

const SubSubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  subSubCategories: [SubSubCategorySchema],
  createdAt: { type: Date, default: Date.now },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  subCategories: [SubCategorySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Category", CategorySchema);
