/*
  Warnings:

  - You are about to alter the column `regularPrice` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `discountPrice` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "regularPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "discountPrice" SET DATA TYPE INTEGER;
