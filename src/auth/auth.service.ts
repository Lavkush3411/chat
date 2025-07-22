import { Request, Response } from "express";
import { authRepository } from "./auth.repository";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authRepository.findByEmail(email);
  if (!user) return new Error("UserNotFound");
  const isSame = await compare(password, user?.password as string);
  if (!isSame) return new Error("Unauthorized");
  const { password: _, ...userWithoutPassword } = user;
  return {
    jwtToken: sign(userWithoutPassword, process.env.JWT_SECRET_KEY as string),
  };
};
export const signup = async (req: Request, res: Response) => {
  const { password } = req.body;
  const hashedPassword = await hash(password, 10);
  req.body.password = hashedPassword;
  const user = await authRepository.createUser(req.body);
  res.status(201).json(user);
};
