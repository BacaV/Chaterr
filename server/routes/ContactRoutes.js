import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, searchContacts } from "../controllers/ContactController.js";

const ContactsRoutes = Router();

ContactsRoutes.post("/search", verifyToken, searchContacts);
ContactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);

export default ContactsRoutes