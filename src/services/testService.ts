import { Test } from "@prisma/client"; 
import * as testRepository from "./../repositories/testRepository.js";

export type CreateTestData = Omit<Test,"id">

export async function createTest (test : CreateTestData) {

    const {categoryId, disciplineId, teacherId} = test;

    /* README: DUAS VALIDAÇÕES DEVEM SER FEITAS
    PRIMEIRA: A DISCIPLINA E O PROFESSOR DEVEM EXISTIR NA TABELA DE CORRELAÇÃO
    SEGUNDA: A CATEGORIA E A DISCIPLINA DEVEM EXISTIR NA TABELA DE CORRELAÇÃO*/

    await validateTest(categoryId, disciplineId ,teacherId);

    await testRepository.createTest(test)
}

export async function validateTest (categoryId : number, disciplineId : number, teacherId : number ) {

    const checkCategoryDiscipline = await testRepository.findByCategoryDisciplineId(categoryId, disciplineId);
    if (!checkCategoryDiscipline) {
        throw {
            name: "notFound",
            message: "This discipline has not tests related with this category"
        }
    }
    const checkteacherDiscipline = await testRepository.findByteacherDisciplineId(disciplineId,teacherId);

    if (!checkteacherDiscipline) {
        throw {
            name: "notFound",
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
