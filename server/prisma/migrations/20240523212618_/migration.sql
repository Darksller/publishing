/*
  Warnings:

  - You are about to drop the column `editorId` on the `Publication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_editorId_fkey";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "editorId";

-- CreateTable
CREATE TABLE "Edit" (
    "id" SERIAL NOT NULL,
    "publicationId" INTEGER NOT NULL,
    "editorId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "finishDate" TIMESTAMP(3),

    CONSTRAINT "Edit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Edit_publicationId_key" ON "Edit"("publicationId");

-- AddForeignKey
ALTER TABLE "Edit" ADD CONSTRAINT "Edit_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edit" ADD CONSTRAINT "Edit_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
