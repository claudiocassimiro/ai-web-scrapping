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
  typeOfReport: string,
  context: Document<Record<string, unknown>>[],
) => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Você é um assistente que ajuda pessoas na tomada de decisão criando relatórios no estilo {typeOfReport} com base nas informações de contexto {context}, caso você não tenha contexto sobre a resposta, apenas diga que não sabe, não dê respostas fora do seu contexto.",
    ],
    ["human", "{question}"],
  ]);

  const chain = new LLMChain({
    prompt: chatPrompt,
    llm,
  });

  return chain.call({
    context: context?.map((ctx) => ctx.pageContent),
    typeOfReport,
    question,
  });
};
