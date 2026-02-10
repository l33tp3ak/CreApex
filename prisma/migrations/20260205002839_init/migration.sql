-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Weight" AS ENUM ('KG', 'Gram');

-- CreateEnum
CREATE TYPE "ITILTicketType" AS ENUM ('INV', 'INC', 'REQ', 'WO', 'TAS', 'CHA');

-- CreateEnum
CREATE TYPE "ITILTicketStatus" AS ENUM ('New', 'Assigned', 'In Progress', 'Pending', 'Resolved', 'Closed', 'Cancelled');

-- CreateTable
CREATE TABLE "User" (
    "user_ID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "languageID" TEXT NOT NULL,
    "defaultAddressID" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_ID")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_ID" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryID" INTEGER NOT NULL,
    "regionID" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_ID")
);

-- CreateTable
CREATE TABLE "AddressBook" (
    "addressesID" TEXT NOT NULL,
    "usersID" TEXT NOT NULL,

    CONSTRAINT "AddressBook_pkey" PRIMARY KEY ("addressesID","usersID")
);

-- CreateTable
CREATE TABLE "Country" (
    "country_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currencyID" INTEGER NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_ID")
);

-- CreateTable
CREATE TABLE "ProvinceState" (
    "region_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryID" INTEGER NOT NULL,

    CONSTRAINT "ProvinceState_pkey" PRIMARY KEY ("region_ID")
);

-- CreateTable
CREATE TABLE "Language" (
    "language_ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("language_ID")
);

-- CreateTable
CREATE TABLE "Currency" (
    "currency_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("currency_ID")
);

-- CreateTable
CREATE TABLE "Modele3D" (
    "modele_3d_ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "netVolume" DOUBLE PRECISION NOT NULL,
    "uploaderID" TEXT,

    CONSTRAINT "Modele3D_pkey" PRIMARY KEY ("modele_3d_ID")
);

-- CreateTable
CREATE TABLE "Material" (
    "material_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weightUnit" "Weight" NOT NULL DEFAULT 'Gram',

    CONSTRAINT "Material_pkey" PRIMARY KEY ("material_ID")
);

-- CreateTable
CREATE TABLE "Colour" (
    "colour_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Colour_pkey" PRIMARY KEY ("colour_ID")
);

-- CreateTable
CREATE TABLE "MaterialColour" (
    "materialID" INTEGER NOT NULL,
    "colourID" INTEGER NOT NULL,
    "quantityAvailable" DOUBLE PRECISION NOT NULL,
    "priceByWeight" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "MaterialColour_pkey" PRIMARY KEY ("materialID","colourID")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoice_ID_string" "ITILTicketType" NOT NULL DEFAULT 'INV',
    "invoice_ID_number" SERIAL NOT NULL,
    "purchaseRqStringID" "ITILTicketType" NOT NULL DEFAULT 'REQ',
    "purchaseRqNumberID" INTEGER NOT NULL,
    "billingAddressID" TEXT NOT NULL,
    "shippingAddressID" TEXT,
    "totalBeforeTaxes" DECIMAL(65,30) NOT NULL,
    "taxes" DECIMAL(65,30) NOT NULL,
    "totalAfterTaxes" DECIMAL(65,30) NOT NULL,
    "reservationFee" DECIMAL(65,30) NOT NULL,
    "totalAfterFee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoice_ID_string","invoice_ID_number")
);

-- CreateTable
CREATE TABLE "Request" (
    "request_ID_string" "ITILTicketType" NOT NULL DEFAULT 'REQ',
    "request_ID_number" SERIAL NOT NULL,
    "requestorID" TEXT,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("request_ID_string","request_ID_number")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "work_order_ID_string" "ITILTicketType" NOT NULL DEFAULT 'WO',
    "work_order_ID_number" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "modelID" TEXT NOT NULL,
    "rqStringID" "ITILTicketType" NOT NULL DEFAULT 'REQ',
    "rqNumberID" INTEGER NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("work_order_ID_string","work_order_ID_number")
);

-- CreateTable
CREATE TABLE "Task" (
    "task_ID_string" "ITILTicketType" NOT NULL DEFAULT 'TAS',
    "task_ID_number" SERIAL NOT NULL,
    "selectedMaterial" INTEGER NOT NULL,
    "selectedColour" INTEGER NOT NULL,
    "woStringID" "ITILTicketType" NOT NULL DEFAULT 'WO',
    "woNumberID" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_ID_string","task_ID_number")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Material_name_key" ON "Material"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Colour_name_key" ON "Colour"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoice_ID_number_key" ON "Invoice"("invoice_ID_number");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_purchaseRqStringID_purchaseRqNumberID_key" ON "Invoice"("purchaseRqStringID", "purchaseRqNumberID");

-- CreateIndex
CREATE UNIQUE INDEX "Request_request_ID_number_key" ON "Request"("request_ID_number");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrder_work_order_ID_number_key" ON "WorkOrder"("work_order_ID_number");

-- CreateIndex
CREATE UNIQUE INDEX "Task_task_ID_number_key" ON "Task"("task_ID_number");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_languageID_fkey" FOREIGN KEY ("languageID") REFERENCES "Language"("language_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultAddressID_fkey" FOREIGN KEY ("defaultAddressID") REFERENCES "Address"("address_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("country_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "ProvinceState"("region_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBook" ADD CONSTRAINT "AddressBook_addressesID_fkey" FOREIGN KEY ("addressesID") REFERENCES "Address"("address_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBook" ADD CONSTRAINT "AddressBook_usersID_fkey" FOREIGN KEY ("usersID") REFERENCES "User"("user_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currencyID_fkey" FOREIGN KEY ("currencyID") REFERENCES "Currency"("currency_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceState" ADD CONSTRAINT "ProvinceState_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("country_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modele3D" ADD CONSTRAINT "Modele3D_uploaderID_fkey" FOREIGN KEY ("uploaderID") REFERENCES "User"("user_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialColour" ADD CONSTRAINT "MaterialColour_materialID_fkey" FOREIGN KEY ("materialID") REFERENCES "Material"("material_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialColour" ADD CONSTRAINT "MaterialColour_colourID_fkey" FOREIGN KEY ("colourID") REFERENCES "Colour"("colour_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_purchaseRqStringID_purchaseRqNumberID_fkey" FOREIGN KEY ("purchaseRqStringID", "purchaseRqNumberID") REFERENCES "Request"("request_ID_string", "request_ID_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_billingAddressID_fkey" FOREIGN KEY ("billingAddressID") REFERENCES "Address"("address_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_shippingAddressID_fkey" FOREIGN KEY ("shippingAddressID") REFERENCES "Address"("address_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requestorID_fkey" FOREIGN KEY ("requestorID") REFERENCES "User"("user_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_modelID_fkey" FOREIGN KEY ("modelID") REFERENCES "Modele3D"("modele_3d_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_rqStringID_rqNumberID_fkey" FOREIGN KEY ("rqStringID", "rqNumberID") REFERENCES "Request"("request_ID_string", "request_ID_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_selectedMaterial_selectedColour_fkey" FOREIGN KEY ("selectedMaterial", "selectedColour") REFERENCES "MaterialColour"("materialID", "colourID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_woStringID_woNumberID_fkey" FOREIGN KEY ("woStringID", "woNumberID") REFERENCES "WorkOrder"("work_order_ID_string", "work_order_ID_number") ON DELETE RESTRICT ON UPDATE CASCADE;
