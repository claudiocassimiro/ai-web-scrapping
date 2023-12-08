-- CreateTable
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "vector" vector,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedTags" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "RelatedTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedQuestions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "displayedLink" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "next_page_token" TEXT NOT NULL,
    "serpapi_link" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "RelatedQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelatedTags" ADD CONSTRAINT "RelatedTags_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedQuestions" ADD CONSTRAINT "RelatedQuestions_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
