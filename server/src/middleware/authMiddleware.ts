import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../utils/constants";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(UNAUTHORIZED).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = verified;
    next();
  } catch {
    res.status(UNAUTHORIZED).send("Invalid Token");
  }
};
