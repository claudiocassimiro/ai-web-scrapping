import { TopicType } from "../validations/topicRouteValidation";
import cron from "node-cron";
import { reportGenerator } from "./reportGenerator";
import { getScheduledTopicByIdRepo } from "../../repositories/Topic/getScheduledTopicByIdRepo";
import { storeReportRepo } from "../../repositories/Topic/storeReportRepo";

type ScheduleReport = {
  scheduledTopicId: string;
  periodOfSearch?: string;
};

export default function scheduleReport({
  scheduledTopicId,
  periodOfSearch = "15",
}: ScheduleReport) {
  cron.schedule(`0 0 */${periodOfSearch} * *`, async () => {
    const topicData = await getScheduledTopicByIdRepo(scheduledTopicId);

    const parsedTopicData = {
      ...topicData,
      tags: JSON.parse(`${topicData?.tags}`) as string[],
      tagsToAvoid: JSON.parse(`${topicData?.tags}`) as string[],
    } as { email: string } & TopicType;

    const report = await reportGenerator(parsedTopicData);

    await storeReportRepo({ report, topicId: `${topicData?.id}` });
  });
}
