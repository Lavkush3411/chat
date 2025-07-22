import { PrismaClient } from "@prisma";
import { prisma } from "../prisma/prisma.client";
import { CreateMessageDto } from "./dtos/message.dto";

class MessageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createMessage(senderId: string, message: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        senderId,
        ...message,
      },
    });
  }

  findMessagesByReceiverId(receiverId: string) {
    return this.prisma.message.findMany({ where: { receiverId } });
  }
}

export const messageRepository = new MessageRepository(prisma);
