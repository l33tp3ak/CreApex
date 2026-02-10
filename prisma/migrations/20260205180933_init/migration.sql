/*
  Warnings:

  - The values [Gram] on the enum `Weight` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Weight_new" AS ENUM ('KG', 'GRAM');
ALTER TABLE "public"."Material" ALTER COLUMN "weightUnit" DROP DEFAULT;
ALTER TABLE "Material" ALTER COLUMN "weightUnit" TYPE "Weight_new" USING ("weightUnit"::text::"Weight_new");
ALTER TYPE "Weight" RENAME TO "Weight_old";
ALTER TYPE "Weight_new" RENAME TO "Weight";
DROP TYPE "public"."Weight_old";
ALTER TABLE "Material" ALTER COLUMN "weightUnit" SET DEFAULT 'GRAM';
COMMIT;

-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "weightUnit" SET DEFAULT 'GRAM';
