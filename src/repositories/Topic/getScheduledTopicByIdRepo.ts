import prisma from "../../lib/prisma";

export const getScheduledTopicByIdRepo = async (scheduledTopicId: string) => {
  const topic = await prisma.scheduledTopics.findUnique({
    where: { id: scheduledTopicId },
  });

  return topic;
};
