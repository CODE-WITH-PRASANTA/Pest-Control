import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    joinDate: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
    bio: { type: String, default: "", trim: true },
    avatar: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
