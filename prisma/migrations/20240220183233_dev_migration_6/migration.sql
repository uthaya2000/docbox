/*
  Warnings:

  - Added the required column `fileId` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "fileId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
