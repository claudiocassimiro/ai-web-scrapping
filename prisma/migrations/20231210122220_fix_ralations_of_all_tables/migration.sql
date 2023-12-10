/*
  Warnings:

  - You are about to drop the column `documentId` on the `InlineImages` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `InlineVideos` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `MoreInfo` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `RelatedQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `RelatedTags` table. All the data in the column will be lost.
  - Added the required column `topicId` to the `InlineImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `InlineVideos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `MoreInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `RelatedQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `RelatedTags` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "InlineImages" DROP COLUMN "documentId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InlineVideos" DROP COLUMN "documentId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MoreInfo" DROP COLUMN "documentId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RelatedQuestions" DROP COLUMN "documentId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RelatedTags" DROP COLUMN "documentId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MoreInfo" ADD CONSTRAINT "MoreInfo_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedTags" ADD CONSTRAINT "RelatedTags_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedQuestions" ADD CONSTRAINT "RelatedQuestions_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InlineVideos" ADD CONSTRAINT "InlineVideos_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InlineImages" ADD CONSTRAINT "InlineImages_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
