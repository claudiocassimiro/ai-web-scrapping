/*
  Warnings:

  - You are about to drop the column `author` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `felling` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "author",
DROP COLUMN "felling",
DROP COLUMN "group";

-- CreateTable
CREATE TABLE "MoreInfo" (
    "id" TEXT NOT NULL,
    "author" TEXT,
    "felling" TEXT,
    "group" TEXT,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "MoreInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoreInfo" ADD CONSTRAINT "MoreInfo_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
