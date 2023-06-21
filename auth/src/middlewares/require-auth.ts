import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorixed-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
