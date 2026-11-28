import Service from "../model/Service.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Service, "Service");
