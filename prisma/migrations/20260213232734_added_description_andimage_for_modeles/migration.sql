-- AlterTable
ALTER TABLE "Modele3D" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Modele3DImages" (
    "modele_3d_images_ID" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "parentModeleID" TEXT NOT NULL,

    CONSTRAINT "Modele3DImages_pkey" PRIMARY KEY ("modele_3d_images_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modele3DImages_path_key" ON "Modele3DImages"("path");

-- AddForeignKey
ALTER TABLE "Modele3DImages" ADD CONSTRAINT "Modele3DImages_parentModeleID_fkey" FOREIGN KEY ("parentModeleID") REFERENCES "Modele3D"("modele_3d_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
