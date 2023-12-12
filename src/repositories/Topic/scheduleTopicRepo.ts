import prisma from "../../lib/prisma";
import { TopicType } from "../../utils/validations/topicRouteValidation";

export const scheduleTopicRepo = async (
  topicData: { email: string } & TopicType,
) => {
  const { id } = await prisma.scheduledTopics.create({
    data: {
      topic: topicData.topic,
      tags: JSON.stringify(topicData.tags),
      tagsToAvoid: JSON.stringify(topicData.tagsToAvoid),
      typeOfReport: topicData.typeOfReport,
      email: topicData.email,
    },
  });

  return id;
};
