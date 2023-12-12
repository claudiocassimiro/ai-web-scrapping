import { searchContextRepo } from "../../repositories/Topic/searchContextRepo";
import { storeDataRepo } from "../../repositories/Topic/storeDataRepo";
import { initializeChatOpenAI } from "../aiTools/initializeChatOpenAI";
import { TopicType } from "../validations/topicRouteValidation";
import { scrappingData } from "./scrappingData";
import { splitDocuments } from "./splitDocuments";

export const reportGenerator = async (
  topicData: { email: string } & TopicType,
) => {
  const llm = initializeChatOpenAI();
  const { topic, tags, tagsToAvoid, email, typeOfReport } = topicData;

  const scrapedDataInDocs = await scrappingData({
    topic,
    tags,
    tagsToAvoid,
  });

  const splitedDocs = await splitDocuments(scrapedDataInDocs);

  await storeDataRepo({ splitedDocs, topic, email });

  const message = await searchContextRepo(llm, typeOfReport, topic);

  return message;
};
