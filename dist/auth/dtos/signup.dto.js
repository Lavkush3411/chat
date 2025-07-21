"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpDto = void 0;
const zod_1 = require("zod");
exports.signUpDto = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(3),
});
