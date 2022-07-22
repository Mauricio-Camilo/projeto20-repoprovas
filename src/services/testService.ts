import { Test } from "@prisma/client"; 
import * as testRepository from "./../repositories/testRepository.js";

export type CreateTestData = Omit<Test,"id">

export async function createTest (test : CreateTestData) {

    const {categoryId, disciplineId, teacherId} = test;

    /* README: NA VALIDAÇÃO, USAR O DISCIPLINEID E O TEACHERID PRA PROCURAR
    NA TABELA TEACHERSDISCIPLINES SE EXISTE ESSE PROFESSOR COM ESSA DISCIPLINA */

    await validateTest(categoryId, disciplineId ,teacherId);

    await testRepository.createTest(test)
}

export async function validateTest (categoryId : number, disciplineId : number, teacherId : number ) {

    const checkCategoryId = await testRepository.findByCategoryId(categoryId);
    if (!checkCategoryId) {
        throw {
            name: "notFound",
            message: "category not found"
        }
    }
    const checkteacherDisciplineId = await testRepository.findByteacherDisciplineId(disciplineId,teacherId);

    if (!checkteacherDisciplineId) {
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
