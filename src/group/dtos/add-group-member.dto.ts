import { objectId } from "src/_common/dtos/object-id.validation";
import { z } from "zod";
export const addGroupMemberDto = z.object({
  groupId: objectId,
  memberId: objectId,
});

export type AddGroupMemberDto = z.infer<typeof addGroupMemberDto>;
