import fs from "fs";
import path from "path";
import { UPLOADS_DIR } from "../middleware/upload.js";

const cleanupUploadedFiles = (item) => {
  if (!item) return;
  const urls = [
    item.image,
    item.avatar,
    ...(Array.isArray(item.images) ? item.images : []),
  ].filter(Boolean);

  for (const url of urls) {
    if (typeof url !== "string" || !url.includes("/uploads/")) continue;
    const filename = path.basename(url.split("/uploads/")[1]);
    if (!filename) continue;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.promises.unlink(filePath).catch(() => {});
  }
};

/**
 * Creates standard CRUD controller handlers for a Mongoose model.
 * @param {import("mongoose").Model} Model
 * @param {string} resourceName
 */
export const createCrudController = (Model, resourceName = "Record") => ({
  getAll: async (req, res) => {
    try {
      const items = await Model.find(req.query || {}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: `${resourceName} not found` });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      const status = error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        return res.status(404).json({ success: false, message: `${resourceName} not found` });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      const status =
        error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: `${resourceName} not found` });
      }
      cleanupUploadedFiles(item);
      res.status(200).json({
        success: true,
        message: `${resourceName} deleted successfully`,
        data: item,
      });
    } catch (error) {
      const status = error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },
});
