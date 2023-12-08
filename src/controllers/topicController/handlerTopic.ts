import { Request, Response } from "express";
import { GenericErrorHandler } from "../../utils/GenericErrorHandler";
import {
  topicSchemaValidation,
  TopicType,
} from "../../utils/validations/topicRouteValidation";
import handlerTopicService from "../../services/topicService/handlerTopicService";

const topic = async (req: Request, res: Response) => {
  const { topic, tags, TagsToAvoid, typeOfSearch, typeOfReport } =
    req.body as TopicType;

  const dataIsValid = topicSchemaValidation({
    topic,
    tags,
    TagsToAvoid,
    typeOfSearch, // tipo da busca (Urgente) ou (Pesquisa específica) por padrão será Urgente
    typeOfReport, // tipo do relatório
  });

  if (!dataIsValid) {
    throw new GenericErrorHandler(
      "The topic should not be empty",
      400,
      "Bad Request",
    );
  }

  await handlerTopicService({
    topic,
    tags,
    TagsToAvoid,
    typeOfSearch,
    typeOfReport,
  });

  // preciso utilizar os dados recebidos pela API para fazer a busca na web com IA
  // Vou precisar criar uma serie de prompts e chains auxiliar na construção das respostas
  return res.status(200).json({ message: "Hello World" });
};

const topicController = {
  topic,
};

export default topicController;
