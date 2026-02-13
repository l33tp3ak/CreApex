/*
  Warnings:

  - A unique constraint covering the columns `[apiName]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "apiName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Language_apiName_key" ON "Language"("apiName");
