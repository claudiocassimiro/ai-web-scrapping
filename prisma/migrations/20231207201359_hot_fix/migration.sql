/*
  Warnings:

  - You are about to drop the column `displayedLink` on the `RelatedQuestions` table. All the data in the column will be lost.
  - Added the required column `displayed_link` to the `RelatedQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RelatedQuestions" DROP COLUMN "displayedLink",
ADD COLUMN     "displayed_link" TEXT NOT NULL;
