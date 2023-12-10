import prisma from "../../lib/prisma";
import { compare, genSalt, hash } from "bcrypt";

export const updateUserPasswordRepo = async (
  id: string,
  lastPassword: string,
  newPassword: string,
) => {
  if (await checkUserLastPassword(id, lastPassword)) {
    const salt = await genSalt();
    const hashedPassword = await hash(newPassword, salt);

    const updateUserPassword = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return updateUserPassword;
  } else {
    return null;
  }
};

const checkUserLastPassword = async (id: string, password: string) => {
  const userLastPassword = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!userLastPassword) return null;

  return compare(password, userLastPassword.password);
};
