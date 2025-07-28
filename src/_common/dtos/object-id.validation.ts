import { Types } from "mongoose";
import { z } from "zod";

export const objectId = z
  .string()
  .refine(Types.ObjectId.isValid)
  .transform((val) => new Types.ObjectId(val));
