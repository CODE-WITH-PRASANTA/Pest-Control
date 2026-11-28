import { Router } from "express";
import blogController from "../controller/blogController.js";
import { uploadMemory, convertToWebp, parseJsonFields } from "../middleware/upload.js";

const router = Router();

const handleBlogUpload = [
  uploadMemory.single("image"),
  convertToWebp("image"),
  parseJsonFields(["tags", "published"]),
];

router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);
router.post("/", ...handleBlogUpload, blogController.create);
router.put("/:id", ...handleBlogUpload, blogController.update);
router.patch("/:id", ...handleBlogUpload, blogController.update);
router.delete("/:id", blogController.remove);

export default router;
