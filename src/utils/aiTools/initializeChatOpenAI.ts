import { ChatOpenAI } from "langchain/chat_models/openai";

export const initializeChatOpenAI = () => {
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.5,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  return llm;
};
