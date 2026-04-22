/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `purchaseRqStringID` on the `Invoice` table. All the data in the column will be lost.
  - The primary key for the `Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `woStringID` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `WorkOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rqStringID` on the `WorkOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[purchaseRqNumberID]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_purchaseRqStringID_purchaseRqNumberID_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_woStringID_woNumberID_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_rqStringID_rqNumberID_fkey";

-- DropIndex
DROP INDEX "Invoice_invoice_ID_number_key";

-- DropIndex
DROP INDEX "Invoice_purchaseRqStringID_purchaseRqNumberID_key";

-- DropIndex
DROP INDEX "Request_request_ID_number_key";

-- DropIndex
DROP INDEX "Task_task_ID_number_key";

-- DropIndex
DROP INDEX "WorkOrder_work_order_ID_number_key";

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
DROP COLUMN "purchaseRqStringID",
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoice_ID_number");

-- AlterTable
ALTER TABLE "Request" DROP CONSTRAINT "Request_pkey",
ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("request_ID_number");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "woStringID",
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("task_ID_number");

-- AlterTable
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_pkey",
DROP COLUMN "rqStringID",
ADD CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("work_order_ID_number");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_purchaseRqNumberID_key" ON "Invoice"("purchaseRqNumberID");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_purchaseRqNumberID_fkey" FOREIGN KEY ("purchaseRqNumberID") REFERENCES "Request"("request_ID_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_rqNumberID_fkey" FOREIGN KEY ("rqNumberID") REFERENCES "Request"("request_ID_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_woNumberID_fkey" FOREIGN KEY ("woNumberID") REFERENCES "WorkOrder"("work_order_ID_number") ON DELETE RESTRICT ON UPDATE CASCADE;
