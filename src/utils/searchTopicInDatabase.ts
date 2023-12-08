import prisma from "../lib/prisma";

export const searchTopicInDatabase = async (topic: string) => {
  const existTopic = await prisma.topics.findFirst({
    where: { topic },
  });

  return existTopic;
};
