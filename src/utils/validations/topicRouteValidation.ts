import { z } from "zod";

export const topicSchema = z.object({
  topic: z.string(),
  tags: z.array(z.string()).optional(),
  tagsToAvoid: z.array(z.string()).optional(),
  typeOfSearch: z.string().optional(),
  typeOfReport: z.string().optional(),
});

export type TopicType = z.infer<typeof topicSchema>;

export const topicSchemaValidation = (topic: TopicType) => {
  const { success } = topicSchema.safeParse(topic);

  return success;
};
