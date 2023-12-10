import { Request, Response } from "express";
import { getSingleUserRepo } from "../../repositories/User/getUserRepo";

export const getSingleUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getSingleUser = await getSingleUserRepo(id);

    if (!getSingleUser) {
      res.status(404).send("No found User");
      return;
    }

    res.status(200).json({
      user: getSingleUser,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
