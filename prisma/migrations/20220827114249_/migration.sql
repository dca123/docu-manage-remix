-- CreateEnum
CREATE TYPE "Incorporation" AS ENUM ('FOREIGN', 'LOCAL');

-- CreateEnum
CREATE TYPE "Periodicity" AS ENUM ('FORTNIGHTLY', 'WEEKLY', 'MONTHLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "serial" TIMESTAMP(3) NOT NULL,
    "periodicity" "Periodicity" NOT NULL,
    "licenseeId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licensee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "incorporation" "Incorporation" NOT NULL,

    CONSTRAINT "Licensee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_licenseeId_fkey" FOREIGN KEY ("licenseeId") REFERENCES "Licensee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
