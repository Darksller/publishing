/*
  Warnings:

  - You are about to drop the `UserOnFaculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnFaculty" DROP CONSTRAINT "UserOnFaculty_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnFaculty" DROP CONSTRAINT "UserOnFaculty_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facultyId" INTEGER;

-- DropTable
DROP TABLE "UserOnFaculty";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
