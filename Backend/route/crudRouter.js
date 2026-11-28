import { Router } from "express";

/**
 * Builds a RESTful Express router for a CRUD controller.
 */
export const createCrudRouter = (controller) => {
  const router = Router();
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.remove);
  return router;
};
