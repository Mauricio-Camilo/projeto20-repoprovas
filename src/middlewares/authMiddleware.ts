import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import * as userService from "./../services/userServices.js";

export async function validateToken(req: Request, res: Response, next: NextFunction) {

  const authorization = req.headers["authorization"];
  if (!authorization) {
    throw {
        name: "notFound",
        message: "Missing header"
    }
  }

  const token = authorization.replace("Bearer ", "");
  if (!token) {
    throw {
        name: "notAuthorized",
        message: "Missing token"
    }
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token,JWT_SECRET) as { userId: number };
    const user = await userService.findUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw {
        name: "notAuthorized",
        message: "Invalid token"
    }
  }
}
