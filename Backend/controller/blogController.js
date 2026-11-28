import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import { createCrudController } from "./crudFactory.js";

const baseController = createCrudController(Blog, "Blog");

const toSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const ensureUniqueSlug = async (rawTitle, excludeId = null) => {
  const base = toSlug(rawTitle) || `blog-${Date.now()}`;
  let candidate = base;
  let count = 1;
  while (true) {
    const existing = await Blog.findOne({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    });
    if (!existing) return candidate;
    candidate = `${base}-${count++}`;
  }
};

export default {
  ...baseController,

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = mongoose.Types.ObjectId.isValid(id)
        ? await Blog.findById(id)
        : await Blog.findOne({ slug: id });
      if (!item) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      if (!req.body.slug && req.body.title) {
        req.body.slug = await ensureUniqueSlug(req.body.title);
      }
      const item = await Blog.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      if (req.body.title && !req.body.slug) {
        req.body.slug = await ensureUniqueSlug(req.body.title, req.params.id);
      }
      const item = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      const status =
        error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },
};
