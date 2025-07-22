"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const url_1 = require("url");
const socket_1 = require("./socket");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { User } ;
const socketHandler = (socket, req) => {
    const { query } = (0, url_1.parse)(req.url, true);
    const user = jsonwebtoken_1.default.verify(query.token, process.env.JWT_SECRET_KEY);
    socket_1.sockets.add(query.id, socket);
    socket.on("message", (message) => {
        socket_1.sockets.sendMessage(JSON.parse(message.toString()));
    });
    socket.on("close", (socket, reason) => {
        console.log(reason.toString());
    });
};
exports.socketHandler = socketHandler;
