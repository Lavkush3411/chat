import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (!token) throw new Error("Unauthorized");
  const data = verify(token, process.env.JWT_SECRET_KEY as string);
  if (!data) throw new Error("Invalid Token");
  next();
};
