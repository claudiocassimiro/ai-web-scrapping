import { Request, Response } from "express";
import { createUserRepo } from "../../repositories/User/createUserRepo";
import {
  createUserType,
  createUserValidation,
} from "../../utils/validations/userRouterValidation";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";

export const createUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body as createUserType;

  const dataIsValid = createUserValidation({
    email,
    password,
  });

  if (!dataIsValid) {
    throw new GenericErrorHandler(
      "Email or password must be provided",
      400,
      "Bad Request",
    );
  }

  try {
    const createUser = await createUserRepo({ email, password });

    res.status(200).send({
      createUser,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
