import { OpenAI } from "langchain/llms/openai";

export const initializeOpenAI = () => {
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  return llm;
};
