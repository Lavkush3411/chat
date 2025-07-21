import { Request, Response } from "express";
import { authRepository } from "./auth.repository";

export const login = async (req: Request, res: Response) => {
//   throw new Error("bad request");
  const user = await authRepository.createUser(req.body);
  res.status(201).json(user);
};
export const signup = async (req: Request, res: Response) => {};
