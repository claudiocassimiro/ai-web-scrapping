import prisma from "../../lib/prisma";
import { genSalt, hash } from "bcrypt";
import { createUserType } from "../../utils/validations/userRouterValidation";

export const createUserRepo = async ({ email, password }: createUserType) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);

  const createUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return createUser;
};
