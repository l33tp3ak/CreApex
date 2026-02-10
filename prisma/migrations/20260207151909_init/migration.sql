-- CreateTable
CREATE TABLE "Cart" (
    "cartOwnerID" TEXT NOT NULL,
    "orderedModelID" TEXT NOT NULL,
    "orderedMaterialID" INTEGER NOT NULL,
    "orderedColourID" INTEGER NOT NULL,
    "quantityOrdered" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartOwnerID","orderedModelID","orderedMaterialID","orderedColourID")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_cartOwnerID_fkey" FOREIGN KEY ("cartOwnerID") REFERENCES "User"("user_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderedModelID_fkey" FOREIGN KEY ("orderedModelID") REFERENCES "Modele3D"("modele_3d_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderedMaterialID_fkey" FOREIGN KEY ("orderedMaterialID") REFERENCES "Material"("material_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderedColourID_fkey" FOREIGN KEY ("orderedColourID") REFERENCES "Colour"("colour_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
