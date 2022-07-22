-- CreateTable
CREATE TABLE "TeachersCategories" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "TeachersCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeachersCategories" ADD CONSTRAINT "TeachersCategories_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachersCategories" ADD CONSTRAINT "TeachersCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
