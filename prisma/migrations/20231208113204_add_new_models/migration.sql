-- AlterTable
ALTER TABLE "RelatedQuestions" ALTER COLUMN "thumbnail" DROP NOT NULL;

-- CreateTable
CREATE TABLE "InlineVideos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "thumbnail" TEXT,
    "channel" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "InlineVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InlineImages" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "thumbnail" TEXT,
    "original" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source_name" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "InlineImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InlineVideos" ADD CONSTRAINT "InlineVideos_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InlineImages" ADD CONSTRAINT "InlineImages_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
