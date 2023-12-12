import prisma from "../../lib/prisma";
import { Prisma, ScheduledReports } from "@prisma/client";
import { ChainValues } from "langchain/dist/schema";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";

type storeReportRepo = {
  report: ChainValues;
  topicId: string;
};

export const storeReportRepo = async ({ report, topicId }: storeReportRepo) => {
  try {
    const vectorStore = PrismaVectorStore.withModel<ScheduledReports>(
      prisma,
    ).create(new OpenAIEmbeddings(), {
      prisma: Prisma,
      tableName: "ScheduledReports",
      vectorColumnName: "vector",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    });

    return vectorStore.addModels(
      await prisma.$transaction([
        prisma.scheduledReports.create({
          data: {
            scheduledTopicId: topicId,
            content: report.text,
          },
        }),
      ]),
    );
  } catch (error: any) {
    throw new GenericErrorHandler(
      error.message || "Problem when handler the topic",
      500,
      "Internal error",
    );
  }
};
