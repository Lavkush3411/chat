import { ObjectId, Types } from "mongoose";
import { CreateMessageDto } from "../dtos/message.dto";
import { messageModel, MessageStatus } from "src/db/models/message.model";

class MessageRepository {
  constructor() {}

  createMessage(senderId: Types.ObjectId, message: CreateMessageDto) {
    return messageModel.create({
      data: {
        senderId,
        ...message,
      },
    });
  }

  createMessageBulk(data: any[]) {
    return messageModel.insertMany(data);
  }

  findUnreadMessagesByReceiverId(receiverId: Types.ObjectId) {
    return messageModel.find({
      receiverId,
      status: MessageStatus.UNREAD,
    });
  }
}

export const messageRepository = new MessageRepository();
