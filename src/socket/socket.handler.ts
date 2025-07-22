import { IncomingMessage } from "http";
import { parse } from "url";
import { WebSocket } from "ws";
import { sockets } from "./socket";
import jwt from "jsonwebtoken";
import { User } from "@prisma";
// import { User } ;

export const socketHandler = (socket: WebSocket, req: IncomingMessage) => {
  const { query } = parse(req.url as string, true);
  const user: User = jwt.verify(
    query.token as any,
    process.env.JWT_SECRET_KEY as string
  ) as User;

  sockets.add(query.id as string, socket);
  socket.on("message", (message) => {
    sockets.sendMessage(JSON.parse(message.toString()));
  });
  socket.on("close", (socket, reason) => {
    console.log(reason.toString());
  });
};
