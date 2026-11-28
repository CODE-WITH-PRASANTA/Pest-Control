import { Router } from "express";
import galleryController from "../controller/galleryController.js";
import { uploadMemory, convertManyToWebp } from "../middleware/upload.js";

const router = Router();

const handleGalleryUpload = [
  uploadMemory.array("images", 20),
  convertManyToWebp("images"),
];

router.get("/", galleryController.getAll);
router.get("/:id", galleryController.getById);
router.post("/", ...handleGalleryUpload, galleryController.create);
router.put("/:id", ...handleGalleryUpload, galleryController.update);
router.patch("/:id", ...handleGalleryUpload, galleryController.update);
router.delete("/:id", galleryController.remove);

export default router;
