import { Router } from "express";
import { register,
         updateProfile,
         login,
         getUserInfo } from "../controllers/AuthController.js";
         
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const AuthRoutes =  Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.get("/user-info", verifyToken, getUserInfo);
AuthRoutes.post("/update-profile" , verifyToken, updateProfile);

export default AuthRoutes