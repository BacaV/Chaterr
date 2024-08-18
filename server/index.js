import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoutes);

mongoose.connect(databaseURL).then(() => {console.log("Connected to database")}).catch((err) => console.log(err));

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Please be patient...");
});
