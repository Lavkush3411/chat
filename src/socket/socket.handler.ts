import { IncomingMessage } from "http";
import { parse } from "url";
import { WebSocket } from "ws";
import { sockets } from "./socket";
import jwt from "jsonwebtoken";
import { UserType } from "src/db/models/user.model";
import { createMessageDto } from "src/message/dtos/message.dto";

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
    if (!user._id)
      return socket.send(
        JSON.stringify({
          message: "user name not found",
          status: 401,
          ack: false,
        })
      );
    if (!user.name)
      return socket.send(
        JSON.stringify({
          message: "user name not found",
          status: 401,
          ack: false,
        })
      );
    const msg = JSON.parse(message.toString());
    const result = createMessageDto.safeParse(msg);
    if (!result.data)
      return socket.send(
        JSON.stringify({
          message: "message format has errors",
          errors: result.error,
          status: 401,
          ack: false,
        })
      );

    await sockets.sendMessage(user._id, msg);
  });
  socket.on("close", (socket, reason) => {
    console.log(reason.toString());
  });
};
