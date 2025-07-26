import { SignUpDto } from "../../user/dtos/signup.dto";
import {
  getModelForClass,
  modelOptions,
  prop,
  DocumentType,
} from "@typegoose/typegoose";
@modelOptions({
  schemaOptions: {
    strict: true,
    timestamps: true,
  },
})
export class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;
}

export const userModel = getModelForClass(User);
export type UserType = DocumentType<User>;
