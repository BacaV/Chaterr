import { Router } from "express";
import { register } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";

const AuthRoutes =  Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);

export default AuthRoutes