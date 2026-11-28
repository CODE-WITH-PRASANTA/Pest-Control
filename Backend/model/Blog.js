import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, index: true },
    category: { type: String, default: "Pest Control", trim: true },
    location: { type: String, default: "", trim: true },
    desc: { type: String, default: "", trim: true },
    excerpt: { type: String, default: "", trim: true },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    image: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Published", "Draft", "Unpublished"],
      default: "Published",
    },
    mode: {
      type: String,
      enum: ["now", "later"],
      default: "now",
    },
    schedule: { type: String, default: "" },
    date: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
    author: { type: String, default: "Admin", trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
