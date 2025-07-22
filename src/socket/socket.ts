import { CreateMessageDto } from "src/message/dtos/message.dto";
import {
  createMessage,
  findMessagesByReceiverId,
} from "src/message/message.service";
import { WebSocket } from "ws";

export class Sockets {
  public sockets: Map<string, WebSocket>;

  constructor() {
    this.sockets = new Map();
  }

  async add(userId: string, socket: WebSocket) {
    this.sockets.set(userId, socket);
    const messages = await findMessagesByReceiverId(userId);
    for (const message of messages) {
      socket.send(message.message);
    }
  }

  get(userId: string, socket: WebSocket) {
    return this.sockets.get(userId);
  }

  async sendMessage(senderId: string, createMessageDto: CreateMessageDto) {
    const { receiverId } = createMessageDto;
    const receiverSocket = this.sockets.get(receiverId);
    if (!receiverSocket) return await createMessage(senderId, createMessageDto);
    receiverSocket?.send(createMessageDto.message);
  }
}

export const sockets = new Sockets();
