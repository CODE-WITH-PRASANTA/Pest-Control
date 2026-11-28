import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Residential", trim: true },
    location: { type: String, default: "", trim: true },
    desc: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Published", "Draft", "Unpublished"],
      default: "Published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
