"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const prisma_client_1 = require("../prisma/prisma.client");
class AuthRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static get() {
        if (this.instance)
            return this.instance;
        this.instance = new AuthRepository(prisma_client_1.prisma);
        return this.instance;
    }
    createUser(data) {
        return this.prismaClient.user.create({ data });
    }
}
exports.authRepository = AuthRepository.get();
