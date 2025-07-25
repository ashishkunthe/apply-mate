import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestExtended extends Request {
  userId: string;
}

export async function authMiddleware(
  req: RequestExtended,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      message: "No credentials",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decode) {
      return res.json({ message: "Invalid credentials" });
    }
    req.userId = decode.userId as string;
    next();
  } catch (error) {
    console.log("Something went wrong ");
  }
}
