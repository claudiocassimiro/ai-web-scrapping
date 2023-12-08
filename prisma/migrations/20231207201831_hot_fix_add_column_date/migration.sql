/*
  Warnings:

  - Added the required column `date` to the `RelatedQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RelatedQuestions" ADD COLUMN     "date" TEXT NOT NULL;
