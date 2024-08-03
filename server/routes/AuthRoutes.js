import { Router } from "express";
import { register } from "../controllers/AuthController.js";

const AuthRoutes =  Router();

AuthRoutes.post("/register", register);

export default AuthRoutes