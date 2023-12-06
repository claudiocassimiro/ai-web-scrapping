import { NextFunction, Request, Response } from "express";
import { GenericErrorHandler } from "../utils/GenericErrorHandler";

const errorHandler = (
  error: GenericErrorHandler,
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
