import { Types } from "mongoose";
import { CreateMessageDto } from "src/message/dtos/message.dto";
import {
  createMessage,
  findUnreadMessagesByReceiverId,
} from "src/message/services/message.service";
import { WebSocket } from "ws";

export class Sockets {
  public sockets: Map<Types.ObjectId, WebSocket>;

  constructor() {
    this.sockets = new Map();
  }

  async add(userId: Types.ObjectId, socket: WebSocket) {
    this.sockets.set(userId, socket);
    const messages = await findUnreadMessagesByReceiverId(userId);
    for (const message of messages) {
      socket.send(message.message);
    }
  }

  get(userId: Types.ObjectId, socket: WebSocket) {
    return this.sockets.get(userId);
  }

  async sendMessage(
    senderId: Types.ObjectId,
    createMessageDto: CreateMessageDto
  ) {
    const { receiverId } = createMessageDto;
    const receiverSocket = this.sockets.get(receiverId);
    if (!receiverSocket) return await createMessage(senderId, createMessageDto);
    receiverSocket?.send(createMessageDto.message);
  }
}

export const sockets = new Sockets();
