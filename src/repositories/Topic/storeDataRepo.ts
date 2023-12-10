import prisma from "../../lib/prisma";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import {
  MoreInfo,
  Prisma,
  Document as PrismaDocument,
  RelatedQuestions,
} from "@prisma/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/dist/document";
import { initializeChatOpenAI } from "../../utils/aiTools/initializeChatOpenAI";
import { ChatPromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { GenericErrorHandler } from "../../utils/errors/GenericErrorHandler";

export const storeDataRepo = async (
  splitedDocs: Document<Record<string, any>>[],
  topic: string,
  email: string,
) => {
  try {
    const llm = initializeChatOpenAI();

    const chatPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `
      Dado o seu papel de investigar e identificar o autor de um texto, bem como determinar o sentimento associado a ele, é essencial categorizar cada documento em um dos seguintes grupos: "eu" (quando o texto se refere à pessoa que está escrevendo), "outro" (quando uma pessoa fala sobre outra pessoa) e "ambiente" (quando o texto aborda temas como veículos o ambiente será veículos, videogames tem ambientes de videogames, etc.).

      Sua tarefa consiste em analisar cada documento contido em {splitedDocs} e fornecer as seguintes informações em formato JSON:
      {jsonFormat}
      Certifique-se de incluir essas informações para cada documento presente na lista. Fique à vontade para ajustar e melhorar conforme necessário.
      `,
      ],
    ]);

    const chain = new LLMChain({
      prompt: chatPrompt,
      llm,
    });

    const message = await chain.call({
      splitedDocs: splitedDocs?.map((doc) => doc.pageContent),
      jsonFormat: JSON.stringify({
        author: "nome_do_autor",
        feeling: "sentimento_identificado",
        group: "eu/outro/'ambiente'",
      }),
    });

    const fixedJsonString = message.text
      .replace(/}\n{/g, "},{")
      .replace(/\n/g, "");

    const javascriptObj = JSON.parse(`[${fixedJsonString}]`);

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

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const [createdTopic] = await prisma.$transaction([
      prisma.topics.create({
        data: {
          topic,
          userId: user.id,
          relatedTags: {
            create: splitedDocs
              .flatMap((content) => content.metadata.relatedTags)
              .map((relatedTag) => ({ tag: relatedTag.tag })),
          },
          moreInfo: {
            create: javascriptObj?.map(
              (document: MoreInfo) =>
                ({
                  author: document.author,
                  feeling: document.feeling,
                  group: document.group,
                }) || [],
            ),
          },
          relatedQuestions: {
            create: splitedDocs
              .flatMap((content) => content.metadata.relatedQuestions)
              .map((quest: RelatedQuestions) => ({
                question: quest.question,
                snippet: quest.snippet,
                title: quest.title,
                date: quest.date,
                link: quest.link,
                displayed_link: quest.displayed_link,
                thumbnail: quest.thumbnail,
                source_logo: quest.source_logo,
                next_page_token: quest.next_page_token,
                serpapi_link: quest.serpapi_link,
              })),
          },
          inlineVideos: {
            create: splitedDocs
              .flatMap((content) => content.metadata.inlineVideos)
              .map((video) => ({
                position: video.position,
                title: video.title,
                link: video.link,
                thumbnail: video.thumbnail,
                channel: video.channel,
                duration: video.duration,
                platform: video.platform,
                data: video.data,
                key_moments: video.key_moments,
              })),
          },
          inlineImages: {
            create: splitedDocs
              .flatMap((content) => content.metadata.inlineImages)
              .map((image) => ({
                source: image?.source || null,
                thumbnail: image?.thumbnail || null,
                original: image?.original || null,
                title: image?.title || null,
                source_name: image?.source_name || null,
                link: image?.link || null,
              })),
          },
        },
      }),
    ]);

    await vectorStore.addModels(
      await prisma.$transaction(
        splitedDocs?.map((content) =>
          prisma.document.create({
            data: {
              topicId: createdTopic.id,
              content: content.pageContent,
              media: content.metadata.media,
              date: content.metadata.data,
              link: content.metadata.link,
            },
          }),
        ),
      ),
    );
  } catch (error: any) {
    throw new GenericErrorHandler(
      error.message || "Problem when save the data",
      500,
      "Internal error",
    );
  }
};
