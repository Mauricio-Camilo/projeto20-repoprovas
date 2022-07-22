import prisma from "./../config/database.js";
import { CreateTestData } from "../services/testService.js";

export async function findByCategoryDisciplineId (categoryId : number, disciplineId : number) {
    const checkteacherDiscipline = await prisma.disciplinesCategories.findFirst(
        {where : {
            categoryId,
            disciplineId
        }});    
    return checkteacherDiscipline;
}

export async function findByteacherDisciplineId (disciplineId : number, teacherId: number) {
    const checkteacherDiscipline = await prisma.teachersDisciplines.findFirst(
        {where : {
            teacherId,
            disciplineId
        }});
    return checkteacherDiscipline;
}

export async function createTest (test : CreateTestData) {
    await prisma.test.create({data : test})
}

export async function getTestsByDiscipline () {
    return await prisma.term.findMany({
        select: {id: true, number: true, 
            disciplines: {select: {id: true, name: true,
                disciplinesCategories: {select: {
                    categories: {select: {id: true, name: true, 
                        tests: {select: {id: true, name: true,}}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
    })
}



