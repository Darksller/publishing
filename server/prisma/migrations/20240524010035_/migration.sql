-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "markId" INTEGER;

-- CreateTable
CREATE TABLE "Mark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_markId_fkey" FOREIGN KEY ("markId") REFERENCES "Mark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
