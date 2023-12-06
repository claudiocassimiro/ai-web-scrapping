import { NextFunction, Request, Response, RequestHandler } from "express";

const resolver = (handlerFn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(handlerFn(req, res, next));
    } catch (e) {
      return next(e);
    }
  };
};

export default resolver;
