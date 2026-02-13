/*
  Warnings:

  - A unique constraint covering the columns `[cartOwnerID,orderedModelID,orderedMaterialID,orderedColourID]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_countryID_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_regionID_fkey";

-- DropForeignKey
ALTER TABLE "AddressBook" DROP CONSTRAINT "AddressBook_addressesID_fkey";

-- DropForeignKey
ALTER TABLE "AddressBook" DROP CONSTRAINT "AddressBook_usersID_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_cartOwnerID_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_currencyID_fkey";

-- DropForeignKey
ALTER TABLE "MaterialColour" DROP CONSTRAINT "MaterialColour_colourID_fkey";

-- DropForeignKey
ALTER TABLE "MaterialColour" DROP CONSTRAINT "MaterialColour_materialID_fkey";

-- DropForeignKey
ALTER TABLE "ProvinceState" DROP CONSTRAINT "ProvinceState_countryID_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "stackAuthId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_cartOwnerID_orderedModelID_orderedMaterialID_orderedCo_key" ON "Cart"("cartOwnerID", "orderedModelID", "orderedMaterialID", "orderedColourID");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("country_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "ProvinceState"("region_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBook" ADD CONSTRAINT "AddressBook_addressesID_fkey" FOREIGN KEY ("addressesID") REFERENCES "Address"("address_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBook" ADD CONSTRAINT "AddressBook_usersID_fkey" FOREIGN KEY ("usersID") REFERENCES "User"("user_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currencyID_fkey" FOREIGN KEY ("currencyID") REFERENCES "Currency"("currency_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceState" ADD CONSTRAINT "ProvinceState_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("country_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialColour" ADD CONSTRAINT "MaterialColour_materialID_fkey" FOREIGN KEY ("materialID") REFERENCES "Material"("material_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialColour" ADD CONSTRAINT "MaterialColour_colourID_fkey" FOREIGN KEY ("colourID") REFERENCES "Colour"("colour_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_cartOwnerID_fkey" FOREIGN KEY ("cartOwnerID") REFERENCES "User"("user_ID") ON DELETE CASCADE ON UPDATE CASCADE;
