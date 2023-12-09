import { TopicType } from "../../utils/validations/topicRouteValidation";
import "dotenv/config";
import { scrappingData } from "../../utils/scrappingData";
import { splitDocuments } from "../../utils/splitDocuments";
import { initializeChatOpenAI } from "../../utils/initializeChatOpenAI";
import { storeDataInDatabase } from "../../utils/storeDataInDatabase";
import { searchDataInDatabase } from "../../utils/searchDataInDatabase";
import { searchTopicInDatabase } from "../../utils/searchTopicInDatabase";
import { GenericErrorHandler } from "../../utils/GenericErrorHandler";

const handlerTopicService = async ({
  topic,
  tags,
  TagsToAvoid,
  typeOfSearch,
  typeOfReport,
}: TopicType) => {
  const llm = initializeChatOpenAI();
  try {
    const thisTopicWasSerchedBefore = await searchTopicInDatabase(topic);

    if (!thisTopicWasSerchedBefore) {
      const scrapedDataInDocs = await scrappingData(topic, tags, TagsToAvoid);

      const splitedDocs = await splitDocuments(scrapedDataInDocs);

      await storeDataInDatabase(splitedDocs, topic);

      const message = await searchDataInDatabase(llm, typeOfReport, topic);

      return message;
    }

    const message = await searchDataInDatabase(llm, typeOfReport, topic);

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
