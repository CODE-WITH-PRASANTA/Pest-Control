import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Profile from "./model/Profile.js";
import { UPLOADS_DIR } from "./middleware/upload.js";
import profileRoutes from "./route/profileRoutes.js";
import enquiryRoutes from "./route/enquiryRoutes.js";
import bookingRoutes from "./route/bookingRoutes.js";
import serviceRoutes from "./route/serviceRoutes.js";
import blogRoutes from "./route/blogRoutes.js";
import projectRoutes from "./route/projectRoutes.js";
import teamRoutes from "./route/teamRoutes.js";
import galleryRoutes from "./route/galleryRoutes.js";
import categoryRoutes from "./route/categoryRoutes.js";
import blogCommentRoutes from "./route/blogCommentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pest_control";

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Pest Control Backend API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    dbState: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// API Routes
app.use("/api/profiles", profileRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blog-comments", blogCommentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const seedDefaultProfile = async () => {
  const count = await Profile.countDocuments();
  if (count === 0) {
    await Profile.create({
      name: "Admin User",
      email: "admin@pest-control.com",
      travelerType: "Super Admin",
      phone: "9876543210",
    });
    console.log("Seeded default admin profile");
  }
};

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);
    await seedDefaultProfile();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
