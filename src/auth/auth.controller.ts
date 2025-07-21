import express from "express";
import { login } from "./auth.service";
const authRouter = express.Router();

authRouter.post("/signup", login);
authRouter.post("/login", (req, res) => {});
export { authRouter };
