import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

import {
  ChatOpenAI,
  ChatOpenAICallOptions,
} from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { prepareAiResponse } from "../../utils/aiTools/prepareAiResponse";
import { ChainValues } from "langchain/dist/schema";

export const searchContextRepo = async (
  llm: ChatOpenAI<ChatOpenAICallOptions>,
  typeOfReport: string = "relatório",
  topic: string,
) => {
  const vectorStore = new PrismaVectorStore(new OpenAIEmbeddings(), {
    db: prisma,
    prisma: Prisma,
    tableName: "Document",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  });

  const question = `Escreva um relatório sobre ${topic} faça uma análise e utilize os contextos relacionados para isso.`;

  const documents = await vectorStore.similaritySearch(question, 10);

  const context = documents.filter((document) => {
    if (document.metadata?._distance) {
      return (
        Number(
          document.metadata._distance
            .toString()
            .match(/^-?\d+(\.\d{1,2})?/)?.[0] || 0,
        ) <= 0.24
      );
    }
  });

  if (context?.length === 0) {
    return {
      text: "Desculpe, mas não tenho informações sobre esse assunto",
    } as ChainValues;
  }

  const message = await prepareAiResponse(llm, question, typeOfReport, context);

  return message;
};
