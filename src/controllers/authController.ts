import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function Registration(req: Request, res: Response) {
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
