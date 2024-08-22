import { Router } from "express";
import { register,
         deleteImage,
         updateProfile,
         login,
         getUserInfo,
         updateImage,
        logout } from "../controllers/AuthController.js";
         
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/profiles/" });

const AuthRoutes =  Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.get("/user-info", verifyToken, getUserInfo);
AuthRoutes.post("/update-profile" , verifyToken, updateProfile);
AuthRoutes.post("/update-profile-image" , verifyToken, upload.single("profile-image") ,updateImage);
AuthRoutes.delete("/delete-profile-image" , verifyToken, deleteImage);
AuthRoutes.post("/logout", logout);

export default AuthRoutes