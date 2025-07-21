"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDto = void 0;
const signup_dto_1 = require("./signup.dto");
exports.loginDto = signup_dto_1.signUpDto.pick({ email: true, password: true });
