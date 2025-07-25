import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function Registration(req: Request, res: Response) {
  const { userName, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        message: "User already exist! pls login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: "User Registration complete",
      token: token,
    });
  } catch (error) {
    console.log("error in registration", error);
    res.status(500).json({
      message: "Registration Failed",
    });
  }
}

export default async function Login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: findUser._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log("Error logging in");
    res.status(500).json({
      message: "Error logging in ",
    });
  }
}
