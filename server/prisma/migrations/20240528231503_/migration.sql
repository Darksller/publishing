-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_planId_fkey";

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
