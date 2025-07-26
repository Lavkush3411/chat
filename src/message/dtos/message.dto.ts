import { Types } from "mongoose";
import { z } from "zod";

export const createMessageDto = z.object({
  message: z.string().min(1),
  receiverId: z
    .string()
    .refine(Types.ObjectId.isValid)
    .transform((val) => new Types.ObjectId(val)),
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;
