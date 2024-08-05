import { Router } from "express";
import { register } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";
import { getUserInfo } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const AuthRoutes =  Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.get("/user-info", verifyToken, getUserInfo);

export default AuthRoutes