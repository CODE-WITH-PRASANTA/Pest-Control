import Project from "../model/Project.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Project, "Project");
