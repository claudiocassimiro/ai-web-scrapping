import { verify } from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, email: any) => {
    if (err) return res.sendStatus(403);
    req.user = email;
    return next();
  });
};
