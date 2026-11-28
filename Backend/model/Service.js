import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, default: "", trim: true },
    category: { type: String, required: true, trim: true },
    location: { type: String, default: "", trim: true },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
