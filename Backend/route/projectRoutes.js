import { Router } from "express";
import projectController from "../controller/projectController.js";
import { uploadMemory, convertManyToWebp } from "../middleware/upload.js";

const router = Router();

const handleProjectUpload = [
  uploadMemory.array("images", 20),
  convertManyToWebp("images"),
];

router.get("/", projectController.getAll);
router.get("/:id", projectController.getById);
router.post("/", ...handleProjectUpload, projectController.create);
router.put("/:id", ...handleProjectUpload, projectController.update);
router.patch("/:id", ...handleProjectUpload, projectController.update);
router.delete("/:id", projectController.remove);

export default router;
