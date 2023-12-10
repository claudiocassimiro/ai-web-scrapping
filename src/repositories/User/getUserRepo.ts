import prisma from "../../lib/prisma";

export const getSingleUserRepo = async (id: string) => {
  const getUserById = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (getUserById) return getUserById;

  return null;
};
