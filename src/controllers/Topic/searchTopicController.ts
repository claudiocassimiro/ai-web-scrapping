import { Request, Response } from "express";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";
import {
  topicSchemaValidation,
  TopicType,
} from "../../utils/validations/topicRouteValidation";
import handlerTopicService from "../../services/topicService/handlerTopicService";

export const searchTopicController = async (req: Request, res: Response) => {
  const {
    topic,
    tags,
    tagsToAvoid,
    typeOfSearch,
    typeOfReport,
    periodOfSearch,
  } = req.body as TopicType;

  const dataIsValid = topicSchemaValidation({
    topic,
    tags,
    tagsToAvoid,
    typeOfSearch,
    typeOfReport,
    periodOfSearch,
  });

  if (!dataIsValid.success) {
    throw new GenericErrorHandler(
      dataIsValid.error.errors.map((err) => err.message).join(", "),
      400,
      "Bad Request",
    );
  }

  const message = await handlerTopicService({
    email: req.user?.email,
    topic,
    tags,
    tagsToAvoid,
    typeOfSearch,
    typeOfReport,
    periodOfSearch,
  });

  return res.status(200).json({ message });
};
