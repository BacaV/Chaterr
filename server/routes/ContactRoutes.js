import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, searchContacts, getAllContacts } from "../controllers/ContactController.js";

const ContactsRoutes = Router();

ContactsRoutes.post("/search", verifyToken, searchContacts);
ContactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
ContactsRoutes.get("/get-all-contacts", verifyToken, getAllContacts);
export default ContactsRoutes