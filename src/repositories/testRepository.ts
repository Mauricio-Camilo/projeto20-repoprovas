import prisma from "./../config/database.js";
import { CreateTestData } from "../services/testService.js";

export async function findByCategoryId (id : number) {
   return await prisma.category.findFirst({
        where: {id}
    })
}

export async function findByDisciplineId (id : number) {
    return await prisma.discipline.findFirst({
         where: {id}
     })
 }
 export async function findByTeacherId (id : number) {
    return await prisma.teacher.findFirst({
         where: {id}
     })
 }
 
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

export async function getTestsByTeachers () {
    return await prisma.teacher.findMany({
        select: {id: true, name: true,
            teachersCategories: {select:{
                categories: {select: {id: true, name: true,
                    tests: {select: {name: true,
                        disciplines: {select: {name: true}
                    }}
                }}    
            }}
        }}
    })
}


