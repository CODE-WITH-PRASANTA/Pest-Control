import serviceController from "../controller/serviceController.js";
import { createCrudRouter } from "./crudRouter.js";

export default createCrudRouter(serviceController);
