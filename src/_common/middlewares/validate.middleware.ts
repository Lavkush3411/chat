import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function validateDto<T extends ZodSchema<any>>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const result = schema.safeParse(body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error,
      });
    }

    req.body = result.data;
    next();
  };
}
