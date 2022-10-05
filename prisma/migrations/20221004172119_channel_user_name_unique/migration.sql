/*
  Warnings:

  - You are about to drop the column `name` on the `Channel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_username_key" ON "Channel"("username");
