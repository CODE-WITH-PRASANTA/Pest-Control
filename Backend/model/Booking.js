import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    subject: { type: String, default: "", trim: true },
    service: { type: String, default: "General Pest Control", trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, default: "Contact Form", trim: true },
    message: { type: String, default: "", trim: true },
    date: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Pending", "Cancelled"],
      default: "Pending",
    },
    amount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
