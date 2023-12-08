import prisma from "../lib/prisma";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { Prisma, Document as PrismaDocument } from "@prisma/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/dist/document";

export const storeDataInDatabase = async (
  splitedDocs: Document<Record<string, any>>[],
  topic: string,
) => {
  const vectorStore = PrismaVectorStore.withModel<PrismaDocument>(
    prisma,
  ).create(new OpenAIEmbeddings(), {
    prisma: Prisma,
    tableName: "Document",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  });

  await vectorStore.addModels(
    await prisma.$transaction(
      splitedDocs.map((content) =>
        prisma.document.create({
          data: {
            content: content.pageContent,
            media: content.metadata.media,
            date: content.metadata.data,
            link: content.metadata.link,
            relatedTags: {
              create: content.metadata.relatedTags,
            },
            relatedQuestions: {
              create: content.metadata.relatedQuestions,
            },
            inlineVideos: {
              create: content.metadata.inlineVideos,
            },
            inlineImages: {
              create: content.metadata.inlineImages,
            },
          },
        }),
      ),
    ),
  );

  await prisma.topics.create({
    data: {
      topic,
    },
  });
};
