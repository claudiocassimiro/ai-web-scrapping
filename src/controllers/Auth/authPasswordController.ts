import prisma from "../../lib/prisma";
import { compare } from "bcrypt";
import { generateAccessToken } from "../../utils/token/generateAccessToken";
import { Request, Response } from "express";

export const authPasswordController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.status(404).json({ message: "Not found user" });

    if (await compare(password, user.password)) {
      const accessToken = generateAccessToken(email);

      res.status(200).send({
        accessToken,
      });
    } else {
      res.status(405).send({
        error: "Not Allowed",
      });
    }
  } catch (error: any) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
