import { TopicType } from "../../utils/validations/topicRouteValidation";
import "dotenv/config";
import { scrappingData } from "../../utils/documents/scrappingData";
import { splitDocuments } from "../../utils/documents/splitDocuments";
import { initializeChatOpenAI } from "../../utils/aiTools/initializeChatOpenAI";
import { storeDataRepo } from "../../repositories/Topic/storeDataRepo";
import { searchContextRepo } from "../../repositories/Topic/searchContextRepo";
import { searchTopicRepo } from "../../repositories/Topic/searchTopicRepo";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";

const handlerTopicService = async ({
  topic,
  tags,
  TagsToAvoid,
  typeOfSearch,
  typeOfReport,
  email,
}: { email: string } & TopicType) => {
  const llm = initializeChatOpenAI();
  try {
    const thisTopicWasSerchedBefore = await searchTopicRepo(topic);

    if (!thisTopicWasSerchedBefore) {
      const scrapedDataInDocs = await scrappingData(topic, tags, TagsToAvoid);

      const splitedDocs = await splitDocuments(scrapedDataInDocs);

      await storeDataRepo(splitedDocs, topic, email);

      const message = await searchContextRepo(llm, typeOfReport, topic);

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
