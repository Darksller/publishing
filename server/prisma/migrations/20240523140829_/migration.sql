-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "actualAmount" INTEGER,
ADD COLUMN     "actualDueDate" TEXT,
ADD COLUMN     "copies" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "mark" TEXT,
ADD COLUMN     "releaseDate" TEXT,
ADD COLUMN     "signatureDate" TEXT,
ADD COLUMN     "transferDate" TEXT;
