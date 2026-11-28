import Category from "../model/Category.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Category, "Category");
