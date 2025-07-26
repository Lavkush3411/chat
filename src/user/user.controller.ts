import express from "express";
import { login, signup } from "./services/user.service";
import { validateDto } from "src/_common/middlewares/validate.middleware";
import { signUpDto } from "./dtos/signup.dto";
import { loginDto } from "./dtos/login.dto";
const userRouter = express.Router();

userRouter.post("/signup", validateDto(signUpDto), signup);
userRouter.post("/login", validateDto(loginDto), login);
export { userRouter };
