import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { searchContacts } from "../controllers/ContactController.js";

const ContactsRoutes = Router();

ContactsRoutes.post("/search", verifyToken, searchContacts);

export default ContactsRoutes