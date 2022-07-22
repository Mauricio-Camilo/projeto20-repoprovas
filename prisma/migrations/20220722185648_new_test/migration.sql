/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_disciplineId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "disciplineId";

-- CreateTable
CREATE TABLE "disciplinesCategories" (
    "id" SERIAL NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "disciplinesCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplinesCategories" ADD CONSTRAINT "disciplinesCategories_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinesCategories" ADD CONSTRAINT "disciplinesCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
