import Booking from "../model/Booking.js";
import { createCrudController } from "./crudFactory.js";

export default createCrudController(Booking, "Booking");
