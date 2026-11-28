import bookingController from "../controller/bookingController.js";
import { createCrudRouter } from "./crudRouter.js";

export default createCrudRouter(bookingController);
