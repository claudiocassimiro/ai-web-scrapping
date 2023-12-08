/*
  Warnings:

  - You are about to drop the column `data` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `InlineVideos` table. All the data in the column will be lost.
  - Added the required column `date` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "data",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "InlineVideos" DROP COLUMN "data",
ADD COLUMN     "date" TEXT;
