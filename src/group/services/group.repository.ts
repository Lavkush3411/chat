import { groupModel } from "src/db/models/group.model";
import { CreateGroupDto } from "../dtos/create-group.dto";
import { Types } from "mongoose";
import { groupMemberModel } from "src/db/models/group-member.model";

class GroupRepository {
  async create(userId: Types.ObjectId, createGroupDto: CreateGroupDto) {
    const group = await groupModel.create({
      ...createGroupDto,
      ownerId: userId,
    });
    const groupObject = group.toObject();
    await this.addMember(groupObject._id, userId);
    return groupObject;
  }

  async addMember(groupId: Types.ObjectId, memberId: Types.ObjectId) {
    return groupMemberModel.create({
      groupId,
      memberId,
    });
  }
}

export const groupRepository = new GroupRepository();
