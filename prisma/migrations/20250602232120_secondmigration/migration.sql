-- CreateEnum
CREATE TYPE "SeniorityLevel" AS ENUM ('SENIOR', 'MID', 'JUNIOR');

-- CreateTable
CREATE TABLE "Description" (
    "id" TEXT NOT NULL,
    "companyname" TEXT NOT NULL,
    "seniority" "SeniorityLevel" NOT NULL,
    "experience" INTEGER NOT NULL,
    "skills" TEXT[],
    "optionalskills" TEXT[],
    "githubId" TEXT NOT NULL,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Description_githubId_key" ON "Description"("githubId");

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
