/*
  Warnings:

  - Made the column `phoneNumber` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "phoneNumber" SET NOT NULL;
