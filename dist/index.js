"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const url_1 = require("url");
const socket_1 = require("./socket/socket");
const error_middleware_1 = require("./_common/middlewares/error.middleware");
const response_middleware_1 = require("./_common/middlewares/response.middleware");
const auth_controller_1 = require("./auth/auth.controller");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(response_middleware_1.responseWrapper);
        app.use("/auth", auth_controller_1.authRouter);
        const server = http_1.default.createServer(app);
        const wss = new ws_1.default.Server({ server });
        const sockets = new socket_1.Sockets();
        (0, dotenv_1.config)();
        wss.on("connection", (socket, req) => {
            const { query } = (0, url_1.parse)(req.url, true);
            sockets.add(query.id, socket);
            socket.on("message", (message) => {
                sockets.sendMessage(JSON.parse(message.toString()));
            });
            socket.on("close", (socket, reason) => {
                console.log(reason.toString());
            });
        });
        wss.on("close", (socket, req) => {
            console.log("connection dropped");
        });
        app.use(error_middleware_1.errorHandler);
        server.listen(3000, () => console.log("started listening on 3000"));
    });
}
main();
