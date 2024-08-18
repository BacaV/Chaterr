import { response } from "express";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { renameSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.create({ email, password });

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).send("Invalid credentials");
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.Image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.Image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const updateImage = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!req.file) {
      return res.status(400).send("Image is required");
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { Image: fileName },
      { new: true, runValidators: true }
    )
    return res.status(200).json({
      image: updatedUser.image
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const updateProfile = async (req, res, next) => {

    const { firstName, lastName, color } = req.body;
    const {userId} = req;

  try {
    if (!firstName || !lastName || !color) {
        console.log({firstName, lastName, color});
      return res.status(400).send("All credentials are required");
    }

    const userData = await User.findByIdAndUpdate(
       userId ,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.Image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const deleteImage = async (req, res, next) => {
  
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.image) {
      unlinkSync(user.Image);
    }

    user.Image = null;

    await user.save();

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}