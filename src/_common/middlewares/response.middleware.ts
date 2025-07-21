import { NextFunction, Request, Response } from "express";

export const responseWrapper = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJsonRes = res.json.bind(res);

  res.json = (data: any) => {
    // checking if response has errored value
    if (data?.success === false || res.statusCode >= 400) {
      return originalJsonRes(data);
    }
    const response = {
      success: true,
      data,
    };
    return originalJsonRes(response);
  };

  next();
};
