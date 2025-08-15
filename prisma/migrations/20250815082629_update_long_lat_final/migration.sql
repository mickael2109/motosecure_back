/*
  Warnings:

  - The `lat` column on the `Moto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `long` column on the `Moto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Moto" DROP COLUMN "lat",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "long",
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL DEFAULT 0;
