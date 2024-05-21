/*
  Warnings:

  - You are about to drop the `_FacultyToPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FacultyToPlan" DROP CONSTRAINT "_FacultyToPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_FacultyToPlan" DROP CONSTRAINT "_FacultyToPlan_B_fkey";

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "planId" INTEGER;

-- DropTable
DROP TABLE "_FacultyToPlan";

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
