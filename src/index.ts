import express from "express";
import Websocket from "ws";
import http, { IncomingMessage } from "http";
import { config } from "dotenv";
import { parse } from "url";
import { Sockets } from "./socket/socket";
import { errorHandler } from "./_common/middlewares/error.middleware";
import { responseWrapper } from "./_common/middlewares/response.middleware";
import { authRouter } from "./auth/auth.controller";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(responseWrapper);

  app.use("/auth", authRouter);

  const server = http.createServer(app);
  const wss = new Websocket.Server({ server });
  const sockets = new Sockets();
  config();
  wss.on("connection", (socket, req: IncomingMessage) => {
    const { query } = parse(req.url as string, true);
    sockets.add(query.id as string, socket);
    socket.on("message", (message) => {
      sockets.sendMessage(JSON.parse(message.toString()));
    });
    socket.on("close", (socket, reason) => {
      console.log(reason.toString());
    });
  });

  wss.on("close", (socket: any, req: any) => {
    console.log("connection dropped");
  });
  app.use(errorHandler);
  server.listen(3000, () => console.log("started listening on 3000"));
}

main();
