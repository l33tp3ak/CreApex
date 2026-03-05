-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_regionID_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_currencyID_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "regionID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "currencyID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "ProvinceState"("region_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currencyID_fkey" FOREIGN KEY ("currencyID") REFERENCES "Currency"("currency_ID") ON DELETE SET NULL ON UPDATE CASCADE;
