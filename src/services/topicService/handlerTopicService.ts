import { TopicType } from "../../utils/validations/topicRouteValidation";
import "dotenv/config";
import { scrappingData } from "../../utils/scrappingData";
import { splitDocuments } from "../../utils/splitDocuments";
import { initializeChatOpenAI } from "../../utils/initializeChatOpenAI";
import { storeDataInDatabase } from "../../utils/storeDataInDatabase";
import { searchDataInDatabase } from "../../utils/searchDataInDatabase";

const handlerTopicService = async ({
  topic,
  tags,
  TagsToAvoid,
  typeOfSearch,
  typeOfReport,
}: TopicType) => {
  const llm = initializeChatOpenAI();
  const validateIfHasContext = await searchDataInDatabase(
    llm,
    typeOfReport,
    topic,
  );

  if (
    typeof validateIfHasContext === "string" ||
    validateIfHasContext.text.includes("Desculpe, mas não tenho informações")
  ) {
    const scrapedDataInDocs = await scrappingData(topic, tags, TagsToAvoid);
    const splitedDocs = await splitDocuments(scrapedDataInDocs);

    await storeDataInDatabase(splitedDocs);

    const message = await searchDataInDatabase(llm, typeOfReport, topic);

    return message;
  }

  return validateIfHasContext;
};

export default handlerTopicService;
