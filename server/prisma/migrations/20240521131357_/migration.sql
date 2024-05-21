/*
  Warnings:

  - Made the column `planId` on table `Publication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_planId_fkey";

-- AlterTable
ALTER TABLE "Publication" ALTER COLUMN "planId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
