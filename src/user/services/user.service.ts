import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { userRepository } from "./user.repository";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await userRepository.findByEmail(email);
  if (!user) throw new Error("UserNotFound");
  const isSame = await compare(password, user?.password as string);
  if (!isSame) throw new Error("Unauthorized");
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({
    jwtToken: sign(userWithoutPassword, process.env.JWT_SECRET_KEY as string),
  });
};
export const signup = async (req: Request, res: Response) => {
  const { password } = req.body;
  const hashedPassword = await hash(password, 10);
  req.body.password = hashedPassword;
  const user = await userRepository.createUser(req.body);
  const { password: _, ...userObject } = user.toObject();
  res.status(201).json(userObject);
};
