import express from "express";
import { login, signup } from "./auth.service";
import { validateDto } from "src/_common/middlewares/validate.middleware";
import { signUpDto } from "./dtos/signup.dto";
import { loginDto } from "./dtos/login.dto";
const authRouter = express.Router();

authRouter.post("/signup", validateDto(signUpDto), signup);
authRouter.post("/login", validateDto(loginDto), login);
export { authRouter };
