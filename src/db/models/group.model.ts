import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { Document } from "mongoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    strict: true,
  },
})
export class Group {
  @prop({ required: true })
  name!: string;

  @prop({ ref: () => User, required: true })
  ownerId!: Ref<User>;

  @prop()
  description?: string;
}

export const groupModel = getModelForClass(Group);
export type GroupType = Document<Group>;
