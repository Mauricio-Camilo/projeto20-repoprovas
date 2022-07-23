import { Test } from "@prisma/client"; 
import * as testRepository from "./../repositories/testRepository.js";

export type CreateTestData = Omit<Test,"id">

export async function createTest (test : CreateTestData) {

    const {categoryId, disciplineId, teacherId} = test;

    /* README: DUAS VALIDAÇÕES DEVEM SER FEITAS
    PRIMEIRA: A DISCIPLINA E O PROFESSOR DEVEM EXISTIR NA TABELA DE CORRELAÇÃO
    SEGUNDA: A CATEGORIA E A DISCIPLINA DEVEM EXISTIR NA TABELA DE CORRELAÇÃO*/

    await validateIds(categoryId, disciplineId ,teacherId);

    await validateTest(categoryId, disciplineId ,teacherId);

    await testRepository.createTest(test)
}

export async function validateIds (categoryId : number, disciplineId : number, teacherId : number ) {
    const checkCategoryId = await testRepository.findByCategoryId(categoryId);
    if (!checkCategoryId) {
        throw {
            name: "notFound",
            message: "Category not found"
        }
    }
    const checkDisciplineId = await testRepository.findByDisciplineId(disciplineId);
    if (!checkDisciplineId) {
        throw {
            name: "notFound",
            message: "Discipline not found"
        }
    }
    const checkTeacherId = await testRepository.findByTeacherId(teacherId);
    if (!checkTeacherId) {
        throw {
            name: "notFound",
            message: "Teacher not found"
        }
    }
}

export async function validateTest (categoryId : number, disciplineId : number, teacherId : number ) {

    const checkCategoryDiscipline = await testRepository.findByCategoryDisciplineId(categoryId, disciplineId);
    if (!checkCategoryDiscipline) {
        throw {
            name: "notAuthorized",
            message: "This discipline has not tests related with this category"
        }
    }
    const checkteacherDiscipline = await testRepository.findByteacherDisciplineId(disciplineId,teacherId);

    if (!checkteacherDiscipline) {
        throw {
            name: "notAuthorized",
            message: "This teacher is not related with this discipline"
        }
    }

    /* FAZER UMA VALIDAÇÃO PRA IMPEDIR DE COLOCAR O MESMO NOME DE PROVA SE OS IDS
    DA CATEGORIA E PROFESSOR FOREM IGUAS
    */
}

export async function getTestsByDiscipline () {
    
    const tests = await testRepository.getTestsByDiscipline();
    
    return tests;
}

export async function getTestsByTeachers () {
    
    const tests = await testRepository.getTestsByTeachers();
    
    return tests;
}
