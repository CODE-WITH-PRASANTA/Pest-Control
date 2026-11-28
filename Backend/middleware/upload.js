import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const base = path
      .basename(file.originalname || "image", ext)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const attachUploadedFile = (fieldName) => (req, res, next) => {
  if (req.file) {
    req.body[fieldName] = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }
  next();
};

export const convertToWebp = (fieldName) => async (req, res, next) => {
  if (!req.file) return next();
  try {
    const ext = path.extname(req.file.originalname || "");
    const base = path
      .basename(req.file.originalname || "image", ext)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 40);
    const filename = `${Date.now()}-${base}.webp`;
    const outputPath = path.join(UPLOADS_DIR, filename);

    await sharp(req.file.buffer).webp({ quality: 82 }).toFile(outputPath);

    req.body[fieldName] = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
    next();
  } catch (error) {
    next(error);
  }
};

export const convertManyToWebp = (fieldName = "images") => async (req, res, next) => {
  try {
    let existing = [];
    if (typeof req.body.existingImages === "string") {
      try {
        existing = JSON.parse(req.body.existingImages);
      } catch {
        existing = [];
      }
    } else if (Array.isArray(req.body.existingImages)) {
      existing = req.body.existingImages;
    }

    const uploadedUrls = [];
    const files = Array.isArray(req.files) ? req.files : [];
    for (const file of files) {
      const ext = path.extname(file.originalname || "");
      const base = path
        .basename(file.originalname || "image", ext)
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .slice(0, 40);
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${base}.webp`;
      const outputPath = path.join(UPLOADS_DIR, filename);
      await sharp(file.buffer).webp({ quality: 82 }).toFile(outputPath);
      uploadedUrls.push(`${req.protocol}://${req.get("host")}/uploads/${filename}`);
    }

    if (files.length > 0 || req.body.existingImages !== undefined) {
      const merged = [...existing.filter(Boolean), ...uploadedUrls];
      req.body[fieldName] = merged;
      req.body.image = merged[0] || "";
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const parseJsonFields = (fields = []) => (req, res, next) => {
  for (const field of fields) {
    if (typeof req.body[field] === "string") {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch {
        // Leave as-is if not valid JSON
      }
    }
  }
  next();
};
