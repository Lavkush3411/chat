"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const auth_repository_1 = require("./auth.repository");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   throw new Error("bad request");
    const user = yield auth_repository_1.authRepository.createUser(req.body);
    res.status(201).json(user);
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.signup = signup;
