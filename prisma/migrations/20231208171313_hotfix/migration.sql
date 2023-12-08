/*
  Warnings:

  - You are about to drop the column `felling` on the `MoreInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MoreInfo" DROP COLUMN "felling",
ADD COLUMN     "feeling" TEXT;
