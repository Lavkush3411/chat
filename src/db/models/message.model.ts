import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "src/db/models/user.model";
import { Group } from "./group.model";

export enum MessageStatus {
  READ = "read",
  UNREAD = "unread",
}

@modelOptions({
  schemaOptions: { strict: true },
})
class Message {
  @prop({ ref: () => User, required: true })
  senderId!: Ref<User>;

  @prop({ required: true })
  senderName!: string;

  @prop({ ref: () => User, required: true })
  receiverId!: Ref<User>;

  @prop({ ref: () => Group, required: false })
  groupId?: Ref<Group>;

  @prop({ required: true })
  message!: string;

  @prop({ enum: MessageStatus, default: MessageStatus.UNREAD })
  status!: MessageStatus;
}

export const messageModel = getModelForClass(Message);
export type MessageType = DocumentType<Message>;
