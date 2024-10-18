/*
  Warnings:

  - Added the required column `operatorId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operatorId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "operatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "operatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
