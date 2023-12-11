import { Request, Response } from "express";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";
import {
  topicSchemaValidation,
  TopicType,
} from "../../utils/validations/topicRouteValidation";
import handlerTopicService from "../../services/topicService/handlerTopicService";

export const searchTopicController = async (req: Request, res: Response) => {
  const { topic, tags, tagsToAvoid, typeOfSearch, typeOfReport } =
    req.body as TopicType;

  const dataIsValid = topicSchemaValidation({
    topic,
    tags,
    tagsToAvoid,
    typeOfSearch,
    typeOfReport,
  });

  if (!dataIsValid) {
    throw new GenericErrorHandler(
      "The topic should not be empty",
      400,
      "Bad Request",
    );
  }

  const message = await handlerTopicService({
    email: req.email?.email,
    topic,
    tags,
    tagsToAvoid,
    typeOfSearch,
    typeOfReport,
  });

  return res.status(200).json({ message });
};
