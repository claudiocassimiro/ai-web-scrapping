import prisma from "../../lib/prisma";

export const deleteUserRepo = async (id: string) => {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
};
