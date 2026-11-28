import Profile from "../model/Profile.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Profile, "Profile");
