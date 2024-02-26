/*
  Warnings:

  - You are about to drop the `docs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "docs" DROP CONSTRAINT "docs_user_id_fkey";

-- DropTable
DROP TABLE "docs";

-- CreateTable
CREATE TABLE "docBoxes" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "docBoxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "docBoxId" INTEGER NOT NULL,
    "s3FileId" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "docBoxes" ADD CONSTRAINT "docBoxes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_docBoxId_fkey" FOREIGN KEY ("docBoxId") REFERENCES "docBoxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
