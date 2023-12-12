import { TopicType } from "../../utils/validations/topicRouteValidation";
import "dotenv/config";
import { initializeChatOpenAI } from "../../utils/aiTools/initializeChatOpenAI";
import { searchContextRepo } from "../../repositories/Topic/searchContextRepo";
import { searchTopicRepo } from "../../repositories/Topic/searchTopicRepo";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";
import scheduleReport from "../../utils/documents/scheduleReport";
import { reportGenerator } from "../../utils/documents/reportGenerator";
import { scheduleTopicRepo } from "../../repositories/Topic/scheduleTopicRepo";

const handlerTopicService = async ({
  topic,
  tags,
  tagsToAvoid,
  typeOfSearch,
  typeOfReport,
  email,
  periodOfSearch,
}: { email: string } & TopicType) => {
  const llm = initializeChatOpenAI();
  try {
    if (typeOfSearch === "Busca Especifica") {
      const scheduledTopicId = await scheduleTopicRepo({
        topic,
        tags,
        tagsToAvoid,
        typeOfReport,
        email,
      });

      return scheduleReport({ scheduledTopicId, periodOfSearch });
    }

    const thisTopicWasSerchedBefore = await searchTopicRepo(topic);

    if (!thisTopicWasSerchedBefore) {
      const message = reportGenerator({
        topic,
        tags,
        tagsToAvoid,
        typeOfSearch,
        typeOfReport,
        email,
      });

      return message;
    }

    const message = await searchContextRepo(llm, typeOfReport, topic);

    return message;
  } catch (error: any) {
    throw new GenericErrorHandler(
      error.message || "Problem when handler the topic",
      500,
      "Internal error",
    );
  }
};

export default handlerTopicService;
