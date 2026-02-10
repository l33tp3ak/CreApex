-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ITILTicketStatus" ADD VALUE 'In Review';
ALTER TYPE "ITILTicketStatus" ADD VALUE 'Approved';
ALTER TYPE "ITILTicketStatus" ADD VALUE 'Rejected';

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "status" "ITILTicketStatus" NOT NULL DEFAULT 'New';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "ITILTicketStatus" NOT NULL DEFAULT 'New';

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "status" "ITILTicketStatus" NOT NULL DEFAULT 'New';
