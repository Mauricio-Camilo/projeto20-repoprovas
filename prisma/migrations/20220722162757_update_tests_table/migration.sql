/*
  Warnings:

  - You are about to drop the column `teacherDisciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `DisciplinesCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DisciplinesCategories" DROP CONSTRAINT "DisciplinesCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinesCategories" DROP CONSTRAINT "DisciplinesCategories_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "teacherDisciplineId",
ADD COLUMN     "disciplineId" INTEGER NOT NULL,
ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DisciplinesCategories";

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

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
