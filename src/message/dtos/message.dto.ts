import { Types } from "mongoose";
import { objectId } from "src/_common/dtos/object-id.validation";
import { z } from "zod";

export const createMessageDto = z.object({
  message: z.string().min(1),
  receiverId: objectId,
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;
