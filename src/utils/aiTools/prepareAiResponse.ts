import { ChatPromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import {
  ChatOpenAI,
  ChatOpenAICallOptions,
} from "langchain/chat_models/openai";
import { Document } from "langchain/dist/document";

export const prepareAiResponse = async (
  llm: ChatOpenAI<ChatOpenAICallOptions>,
  question: string,
  typeOfReport: string = "Formate de forma simples",
  context: Document<Record<string, unknown>>[],
) => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Como assistente dedicado à tomada de decisões, sua missão é elaborar relatórios no formato {typeOfReport}, utilizando as informações fornecidas no array de contextos: {context}. Caso não possua informações relevantes para a resposta, por favor, indique que não possui contexto, evitando respostas fora do escopo definido.",
    ],
    ["human", "{question}"],
  ]);

  const chain = new LLMChain({
    prompt: chatPrompt,
    llm,
  });

  const message = await chain.call({
    context: context?.map((ctx) => ctx.pageContent),
    typeOfReport,
    question,
  });

  return message;
};
