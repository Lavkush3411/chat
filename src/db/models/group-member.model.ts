import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Group } from "./group.model";
import { User } from "./user.model";
import { Document } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true, strict: true } })
export class GroupMember {
  @prop({ ref: () => Group, required: true })
  groupId!: Ref<Group>;

  @prop({ ref: () => User, required: true })
  memberId!: Ref<User>;

  @prop({ default: "member", enum: ["admin", "member", "owner"] })
  role!: string;

  @prop({ default: Date.now })
  joinedAt!: Date;
}

export const groupMemberModel = getModelForClass(GroupMember);
export type GroupMemberType = Document<GroupMember>;
