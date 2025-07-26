import { Types } from "mongoose";
import { createMessageDto, CreateMessageDto } from "../dtos/message.dto";
import { messageRepository } from "./message.repository";

export const createMessage = (
  senderId: Types.ObjectId,
  message: CreateMessageDto
) => {
  const result = createMessageDto.safeParse(message);
  if (!result.success) throw new Error(`Validation Failed : ${result.error}`);
  return messageRepository.createMessage(senderId, message);
};

export const findUnreadMessagesByReceiverId = (receiverId: Types.ObjectId) => {
  return messageRepository.findUnreadMessagesByReceiverId(receiverId);
};
