import { response } from "express";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
}

export const register = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const user = await User.create({ email, password });

        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "none"});

        return res.status(201).json({
            user:{
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
        }});

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}