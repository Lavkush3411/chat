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
  /**
   * extract jwt token from request
   */
  const {
    query: { token },
  } = parse(req.url as string, true);
  let user: UserType;

  /**
   * verify the jwt token
   */
  try {
    user = jwt.verify(
      token as any,
      process.env.JWT_SECRET_KEY as string
    ) as UserType;
  } catch {
    socket.close(4001, "Token is required");
    return;
  }

  /**
   * if verified then add user to sockets list
   */

  await sockets.add(user._id, socket);

  /**
   * handle every upcoming messages
   */
  socket.on("message", async (message) => {
    console.log("user", user);
    await sockets.sendMessage(user._id, JSON.parse(message.toString()));
  });
  socket.on("close", (socket, reason) => {
    console.log(reason.toString());
  });
};
