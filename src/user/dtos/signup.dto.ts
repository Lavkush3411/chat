import { z } from "zod";

export const signUpDto = z
  .object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(3),
  })
  .strict();
export type SignUpDto = z.infer<typeof signUpDto>;
