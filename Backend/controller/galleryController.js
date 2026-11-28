import Gallery from "../model/Gallery.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Gallery, "Gallery item");
