import { Request, Response } from "express";
import { deleteUserRepo } from "../../repositories/User/deleteUserRepo";

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteUserRepo(id);

    res.status(204).send();
  } catch (error: any) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
