"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("./auth.service");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/signup", auth_service_1.login);
authRouter.post("/login", (req, res) => { });
