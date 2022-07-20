import prisma from "./../config/database.js";
import { CreateTestData } from "../services/testService.js";

export async function findByCategoryId (id : number) {
    const checkCategoryId = await prisma.category.findUnique({where : {id}});
    return checkCategoryId;
}

export async function findByteacherDisciplineId (id : number) {
    const checkteacherDisciplineId = await prisma.teachersDisciplines.findUnique({where : {id}});
    return checkteacherDisciplineId;
}

export async function createTest (test : CreateTestData) {
    await prisma.test.create({data : test})
}


