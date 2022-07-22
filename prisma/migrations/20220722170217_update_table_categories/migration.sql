/*
  Warnings:

  - You are about to drop the `disciplinesCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disciplineId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "disciplinesCategories" DROP CONSTRAINT "disciplinesCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "disciplinesCategories" DROP CONSTRAINT "disciplinesCategories_disciplineId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "disciplinesCategories";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
