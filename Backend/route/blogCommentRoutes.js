import { Router } from "express";
import blogCommentController from "../controller/blogCommentController.js";

const router = Router();

router.get("/", blogCommentController.getAll);
router.post("/", blogCommentController.create);
router.put("/:id", blogCommentController.update);
router.patch("/:id", blogCommentController.update);
router.delete("/:id", blogCommentController.remove);

export default router;
