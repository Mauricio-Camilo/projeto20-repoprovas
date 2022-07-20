import { Test } from "@prisma/client"; 
import * as testRepository from "./../repositories/testRepository.js";


export type CreateTestData = Omit<Test,"id">

export async function createTest (test : CreateTestData) {

    const {categoryId, teacherDisciplineId} = test;

    await validateTest(categoryId,teacherDisciplineId);

    await testRepository.createTest(test)
}

export async function validateTest (categoryId : number, teacherDisciplineId : number) {

    const checkCategoryId = await testRepository.findByCategoryId(categoryId);
    if (!checkCategoryId) {
        throw {
            name: "notFound",
            message: "category not found"
        }
    }
    const checkteacherDisciplineId = await testRepository.findByteacherDisciplineId(teacherDisciplineId);

    if (!checkteacherDisciplineId) {
        throw {
            name: "notFound",
            message: "teacherDiscipline not found"
        }
    }
}
