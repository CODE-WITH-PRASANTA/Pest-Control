import Team from "../model/Team.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Team, "Team member");
