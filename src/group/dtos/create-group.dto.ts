import { objectId } from "src/_common/dtos/object-id.validation";
import { z } from "zod";
export const createGroupDto = z.object({
  name: z.string(),
  description: z.string().optional(),
  ownerId: objectId,
});

export type CreateGroupDto = z.infer<typeof createGroupDto>;
