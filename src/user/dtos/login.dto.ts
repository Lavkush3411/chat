import { z } from "zod";
import { signUpDto } from "./signup.dto";

export const loginDto = signUpDto.pick({ email: true, password: true });
export type LoginDto = z.infer<typeof loginDto>;
