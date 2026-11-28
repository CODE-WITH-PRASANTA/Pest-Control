import BlogComment from "../model/BlogComment.js";

export default {
  getAll: async (req, res) => {
    try {
      const filter = {};
      if (req.query.blog) filter.blog = req.query.blog;
      if (req.query.status) filter.status = req.query.status;

      const items = await BlogComment.find(filter)
        .populate("blog", "title slug")
        .sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { blog, blogTitle, blogSlug, name, email, message } = req.body;
      if (!blog || !name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Blog, name, email, and message are required.",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const trimmedMessage = message.trim();

      const existing = await BlogComment.findOne({
        blog,
        email: normalizedEmail,
        message: trimmedMessage,
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Duplicate comment: you have already submitted this comment.",
        });
      }

      const item = await BlogComment.create({
        blog,
        blogTitle: blogTitle || "",
        blogSlug: blogSlug || "",
        name: name.trim(),
        email: normalizedEmail,
        message: trimmedMessage,
        status: "Draft",
      });

      res.status(201).json({ success: true, data: item });
    } catch (error) {
      const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await BlogComment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("blog", "title slug");
      if (!item) {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const item = await BlogComment.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }
      res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
        data: item,
      });
    } catch (error) {
      const status = error.name === "CastError" ? 400 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },
};
