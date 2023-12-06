import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";

const errorHandler = (
  error: ErrorHandler,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error && error.statusCode) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    console.error(error);
  }
  next();
};

export default errorHandler;
