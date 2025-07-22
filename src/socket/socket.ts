import { WebSocket } from "ws";

export class Sockets {
  public sockets: Map<string, WebSocket>;

  constructor() {
    this.sockets = new Map();
  }

  add(userId: string, socket: WebSocket) {
    this.sockets.set(userId, socket);
  }

  get(userId: string, socket: WebSocket) {
    return this.sockets.get(userId);
  }

  sendMessage(data: any) {
    const { to, message } = data;
    const socket = this.sockets.get(to);
    socket?.send(message);
  }
}

export const sockets = new Sockets();
