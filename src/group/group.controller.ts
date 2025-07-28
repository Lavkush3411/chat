import { Router } from "express";
import { validateDto } from "src/_common/middlewares/validate.middleware";
import { addGroupMemberDto } from "./dtos/add-group-member.dto";
import { createGroupDto } from "./dtos/create-group.dto";

const groupRouter = Router();

groupRouter.post("", validateDto(createGroupDto));
groupRouter.post("add-member", validateDto(addGroupMemberDto));
