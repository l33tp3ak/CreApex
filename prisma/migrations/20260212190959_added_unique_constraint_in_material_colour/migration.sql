/*
  Warnings:

  - A unique constraint covering the columns `[materialID,colourID]` on the table `MaterialColour` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MaterialColour_materialID_colourID_key" ON "MaterialColour"("materialID", "colourID");
