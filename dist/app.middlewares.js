"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMiddlewares = void 0;
const error_middleware_1 = require("./_common/middlewares/error.middleware");
const response_middleware_1 = require("./_common/middlewares/response.middleware");
const auth_controller_1 = require("./auth/auth.controller");
const socket_handler_1 = require("./socket/socket.handler");
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const appMiddlewares = (app) => {
    /**
     * add global middlewares
     */
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(response_middleware_1.responseWrapper);
    /**
     * add routers
     */
    app.use("/auth", auth_controller_1.authRouter);
    /**
     * end routers
     * ==========================
     */
    /**
     * create http server using express app
     */
    const server = http_1.default.createServer(app);
    /**
     * pass http to websocket server
     */
    const wss = new ws_1.default.Server({ server });
    /**
     * attach socket events
     */
    wss.on("connection", socket_handler_1.socketHandler);
    wss.on("close", (socket, req) => {
        console.log("connection dropped");
    });
    /**
     * insert global error handler
     */
    app.use(error_middleware_1.errorHandler);
    /**
     * finally return http server
     */
    return server;
};
exports.appMiddlewares = appMiddlewares;
