import Enquiry from "../model/Enquiry.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Enquiry, "Enquiry");
