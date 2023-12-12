import { z } from "zod";

enum typesOfSearch {
  Urgente = "Urgente",
  BuscaEspecifica = "Busca Especifica",
}

export const topicSchema = z.object({
  topic: z.string({
    required_error: "The topic should be provided",
  }),
  tags: z.array(z.string()).optional(),
  tagsToAvoid: z.array(z.string()).optional(),
  typeOfSearch: z.nativeEnum(typesOfSearch).optional(),
  typeOfReport: z.string().optional(),
  periodOfSearch: z.string().optional(),
});

export type TopicType = z.infer<typeof topicSchema>;

export const topicSchemaValidation = (topic: TopicType) => {
  const dataIsValid = topicSchema.safeParse(topic);

  if (!dataIsValid.success)
    return { success: dataIsValid.success, error: dataIsValid.error };

  return { success: dataIsValid.success };
};
