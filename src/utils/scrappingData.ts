import { Document } from "langchain/dist/document";
import { getJson } from "serpapi";

export const scrappingData = async (
  topic: string,
  tags: string[] = [],
  TagsToAvoid: string[] = [],
) => {
  let query = topic;

  if (tags.length > 0) {
    query += ` ${tags.map((tag) => `AND ${tag}`).join(" ")}`;
  }

  if (TagsToAvoid.length > 0) {
    query += ` ${TagsToAvoid.map((tag) => `-${tag}`).join(" ")}`;
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
        related_questions?.map((question: any) => ({
          ...question,
          date: question.date || "",
        })) || [],
      link: result.link,
      inlineVideos:
        inline_videos?.map((video: any) => ({
          ...video,
          key_moments: JSON.stringify(video.key_moments) || "",
        })) || [],
      inlineImages: inline_images,
    },
  })) as Document<Record<string, any>>[];

  return docs;
};
