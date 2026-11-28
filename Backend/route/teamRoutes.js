import { Router } from "express";
import teamController from "../controller/teamController.js";
import { upload, attachUploadedFile } from "../middleware/upload.js";

const router = Router();

router.get("/", teamController.getAll);
router.get("/:id", teamController.getById);
router.post("/", upload.single("avatar"), attachUploadedFile("avatar"), teamController.create);
router.put("/:id", upload.single("avatar"), attachUploadedFile("avatar"), teamController.update);
router.patch("/:id", upload.single("avatar"), attachUploadedFile("avatar"), teamController.update);
router.delete("/:id", teamController.remove);

export default router;
