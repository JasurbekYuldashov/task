/*
  Warnings:

  - You are about to drop the column `users` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "users",
ADD COLUMN     "userId" INTEGER[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelId";
