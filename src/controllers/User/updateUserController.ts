import { Request, Response } from "express";
import { updateUserPasswordRepo } from "../../repositories/User/updateUserRepo";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";
import { updateUserSchemaValidation } from "../../utils/validations/userRouterValidation";

export const updateUserPasswordController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { lastPassword, newPassword } = req.body as {
    lastPassword: string;
    newPassword: string;
  };

  const dataIsValid = updateUserSchemaValidation({
    password: lastPassword,
  });

  if (!dataIsValid) {
    throw new GenericErrorHandler(
      "Last password should be provided",
      400,
      "Bad Request",
    );
  }

  try {
    const updateUserPassword = await updateUserPasswordRepo(
      id,
      lastPassword,
      newPassword,
    );

    if (!updateUserPassword) {
      return res.status(403).send({
        Error: "Last password is incorrect",
      });
    }

    res.status(200).json({
      user: updateUserPassword,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
