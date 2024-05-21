-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnFaculty" (
    "userId" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "UserOnFaculty_pkey" PRIMARY KEY ("userId","facultyId")
);

-- AddForeignKey
ALTER TABLE "UserOnFaculty" ADD CONSTRAINT "UserOnFaculty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnFaculty" ADD CONSTRAINT "UserOnFaculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
