-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_languageID_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "languageID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_languageID_fkey" FOREIGN KEY ("languageID") REFERENCES "Language"("language_ID") ON DELETE SET NULL ON UPDATE CASCADE;
