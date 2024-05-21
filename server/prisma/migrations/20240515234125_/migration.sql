-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "dateAdded" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pubTypeId" INTEGER NOT NULL,
    "pubSubTypeId" INTEGER NOT NULL,
    "specialityId" INTEGER NOT NULL,
    "educationFormId" INTEGER NOT NULL,
    "plannedAmount" INTEGER NOT NULL,
    "plannedDueDate" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FacultyToPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToPublication" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FacultyToPlan_AB_unique" ON "_FacultyToPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_FacultyToPlan_B_index" ON "_FacultyToPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToPublication_AB_unique" ON "_AuthorToPublication"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToPublication_B_index" ON "_AuthorToPublication"("B");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_pubTypeId_fkey" FOREIGN KEY ("pubTypeId") REFERENCES "PubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_pubSubTypeId_fkey" FOREIGN KEY ("pubSubTypeId") REFERENCES "PubSubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_educationFormId_fkey" FOREIGN KEY ("educationFormId") REFERENCES "educationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacultyToPlan" ADD CONSTRAINT "_FacultyToPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacultyToPlan" ADD CONSTRAINT "_FacultyToPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToPublication" ADD CONSTRAINT "_AuthorToPublication_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToPublication" ADD CONSTRAINT "_AuthorToPublication_B_fkey" FOREIGN KEY ("B") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
