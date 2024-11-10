/*
  Warnings:

  - Added the required column `from` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toyId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "toyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_toyId_fkey" FOREIGN KEY ("toyId") REFERENCES "Toy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
