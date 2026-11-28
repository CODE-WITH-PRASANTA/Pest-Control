import profileController from "../controller/profileController.js";
import { createCrudRouter } from "./crudRouter.js";

export default createCrudRouter(profileController);
