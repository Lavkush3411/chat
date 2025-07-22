import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/prisma.client";
import { SignUpDto } from "./dtos/signup.dto";

class AuthRepository {
  private static instance: AuthRepository | undefined;
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static get() {
    if (this.instance) return this.instance;
    this.instance = new AuthRepository(prisma);
    return this.instance;
  }

  createUser(data: SignUpDto) {
    return this.prismaClient.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prismaClient.user.findUnique({ where: { email } });
  }
}

export const authRepository = AuthRepository.get();
