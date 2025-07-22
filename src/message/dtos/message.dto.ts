import { z } from "zod";
export const createMessageDto = z.object({
  message: z.string().min(1),
  receiverId: z.string(),
});

export type CreateMessageDto = z.infer<typeof createMessageDto>;
