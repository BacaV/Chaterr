import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel } from "../controllers/ChannelController.js";

const ChannelRoutes = Router();

ChannelRoutes.post("/create-channel", verifyToken, createChannel);

export default ChannelRoutes