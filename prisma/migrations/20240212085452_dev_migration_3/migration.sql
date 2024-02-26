/*
  Warnings:

  - You are about to drop the column `api_key` on the `users` table. All the data in the column will be lost.
  - Added the required column `hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "api_key",
ADD COLUMN     "hash" TEXT NOT NULL;
