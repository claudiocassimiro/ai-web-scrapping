import prisma from "../../lib/prisma";

export const searchTopicRepo = async (topic: string) => {
  const existTopic = await prisma.topics.findFirst({
    where: { topic },
  });

  return existTopic;
};
