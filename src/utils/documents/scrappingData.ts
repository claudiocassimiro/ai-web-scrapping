import { InlineVideos, RelatedQuestions } from "@prisma/client";
import { Document } from "langchain/dist/document";
import { getJson } from "serpapi";

type ScrappingData = {
  topic: string;
  tags?: string[];
  tagsToAvoid?: string[];
};

export const scrappingData = async ({
  topic,
  tags = [],
  tagsToAvoid = [],
}: ScrappingData) => {
  let query = topic;

  if (tags.length > 0) {
    query += ` ${tags.map((tag) => `AND ${tag}`).join(" ")}`;
  }

  if (tagsToAvoid.length > 0) {
    query += ` ${tagsToAvoid.map((tag) => `-${tag}`).join(" ")}`;
  }

  const results = await getJson({
    api_key: process.env.SERP_API_KEY,
    engine: "google",
    q: query,
    google_domain: "google.com",
    gl: "br",
    hl: "pt-br",
    safe: "active",
    device: "mobile",
    num: "10",
  });

  const { related_questions, inline_videos, inline_images, organic_results } =
    results;

  const docs = organic_results.map((result: any) => ({
    pageContent: JSON.stringify(result),
    metadata: {
      media: result.link,
      date: new Date(),
      relatedTags: tags?.map((tag) => ({ tag: tag })),
      relatedQuestions:
        related_questions?.map((question: RelatedQuestions) => ({
          ...question,
          date: question.date || "",
        })) || [],
      link: result.link,
      inlineVideos:
        inline_videos?.map((video: InlineVideos) => ({
          ...video,
          key_moments: JSON.stringify(video.key_moments) || "",
        })) || [],
      inlineImages: inline_images,
    },
  })) as Document<Record<string, any>>[];

  return docs;
};
