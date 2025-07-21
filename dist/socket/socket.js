"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
class Sockets {
    constructor() {
        this.sockets = new Map();
    }
    add(userId, socket) {
        this.sockets.set(userId, socket);
    }
    get(userId, socket) {
        return this.sockets.get(userId);
    }
    sendMessage(data) {
        const { to, message } = data;
        const socket = this.sockets.get(to);
        socket === null || socket === void 0 ? void 0 : socket.send(message);
    }
}
exports.Sockets = Sockets;
