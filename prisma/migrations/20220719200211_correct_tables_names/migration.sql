/*
  Warnings:

  - You are about to drop the `TeachersDisciplines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Term` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeachersDisciplines" DROP CONSTRAINT "TeachersDisciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "TeachersDisciplines" DROP CONSTRAINT "TeachersDisciplines_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_teacherDisciplineId_fkey";

-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_termId_fkey";

-- DropIndex
DROP INDEX "users_password_key";

-- DropTable
DROP TABLE "TeachersDisciplines";

-- DropTable
DROP TABLE "Term";

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "numbers" INTEGER NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherDisciplineId" INTEGER NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
