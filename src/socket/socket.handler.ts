import { IncomingMessage } from "http";
import { parse } from "url";
import { WebSocket } from "ws";
import { sockets } from "./socket";
import jwt from "jsonwebtoken";
import { User } from "@prisma";

export const socketHandler = async (
  socket: WebSocket,
  req: IncomingMessage
) => {
  const { query } = parse(req.url as string, true);
  const user: User = jwt.verify(
    query.token as any,
    process.env.JWT_SECRET_KEY as string
  ) as User;

  await sockets.add(user.sub, socket);
  socket.on("message", async (message) => {
    await sockets.sendMessage(user.sub, JSON.parse(message.toString()));
  });
  socket.on("close", (socket, reason) => {
    console.log(reason.toString());
  });
};
