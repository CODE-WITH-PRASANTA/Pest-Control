import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Residential", trim: true },
    location: { type: String, default: "", trim: true },
    client: { type: String, default: "", trim: true },
    desc: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Published", "Draft", "Unpublished", "Completed", "In Progress", "Planned"],
      default: "Published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
