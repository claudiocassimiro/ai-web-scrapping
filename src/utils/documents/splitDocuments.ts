import { Document } from "langchain/dist/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const splitDocuments = async (
  documents: Document<Record<string, any>>[],
) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  return textSplitter.splitDocuments(documents);
};
