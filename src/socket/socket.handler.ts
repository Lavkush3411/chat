import { IncomingMessage } from "http";
import { parse } from "url";
import { WebSocket } from "ws";
import { sockets } from "./socket";
import jwt from "jsonwebtoken";
import { UserType } from "src/db/models/user.model";

export const socketHandler = async (
  socket: WebSocket,
  req: IncomingMessage
) => {
  const {
    query: { token },
  } = parse(req.url as string, true);
  let user: UserType;
  try {
    user = jwt.verify(
      token as any,
      process.env.JWT_SECRET_KEY as string
    ) as UserType;
  } catch {
    socket.close(4001, "Token is required");
    return;
  }

  await sockets.add(user._id, socket);
  socket.on("message", async (message) => {
    await sockets.sendMessage(user._id, JSON.parse(message.toString()));
  });
  socket.on("close", (socket, reason) => {
    console.log(reason.toString());
  });
};
