/*
  Warnings:

  - Added the required column `topicId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InlineImages" DROP CONSTRAINT "InlineImages_documentId_fkey";

-- DropForeignKey
ALTER TABLE "InlineVideos" DROP CONSTRAINT "InlineVideos_documentId_fkey";

-- DropForeignKey
ALTER TABLE "MoreInfo" DROP CONSTRAINT "MoreInfo_documentId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedQuestions" DROP CONSTRAINT "RelatedQuestions_documentId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedTags" DROP CONSTRAINT "RelatedTags_documentId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "topicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoreInfo" ADD CONSTRAINT "MoreInfo_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedTags" ADD CONSTRAINT "RelatedTags_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedQuestions" ADD CONSTRAINT "RelatedQuestions_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InlineVideos" ADD CONSTRAINT "InlineVideos_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InlineImages" ADD CONSTRAINT "InlineImages_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
