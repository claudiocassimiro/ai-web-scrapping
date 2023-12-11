import prisma from "../../lib/prisma";

export const getAllTopicsRepo = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const topics = await prisma.topics.findMany({
    where: {
      userId: user.id,
    },
    include: {
      document: true,
      moreInfo: true,
      relatedTags: true,
      relatedQuestions: true,
      inlineVideos: true,
      inlineImages: true,
    },
  });

  if (topics) return topics;

  return null;
};
