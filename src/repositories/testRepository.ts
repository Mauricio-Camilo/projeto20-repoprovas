import prisma from "./../config/database.js";
import { CreateTestData } from "../services/testService.js";
import { transformDocument } from "@prisma/client/runtime";

export async function findByCategoryId (id : number) {
    const checkCategoryId = await prisma.category.findUnique({where : {id}});
    return checkCategoryId;
}

// ADAPTAR ESSA QUERY PRA RECEBER O DISCIPLINE ID E O TEACHER ID
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
                categories: {select: {id: true, name: true,
                    tests: {select: {id: true, name: true, 
                        teachers: {select: {id: true, name:true}}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
    })
}



// select: {id: true, name: true, categoryId: true, teacherDisciplineId: true,
//     teacherDisciplines: {select: {
//         id: true, teacherId: true, disciplineId: true
//     }} 
// }

// export async function getByTerms() {
//     const terms = await prisma.term.findMany({
//         select: {id: true, number: true,
//             disciplines: { select: {id: true, name: true,
//                 categories: {select: {
//                     category: {select: {id: true, name: true, 
//                         tests: {select: {id: true, name: true, pdfUrl: true,
//                             teacher: {select: {name: true}}
//                         }}
//                     }}
//                 }}
//             }}
//         }
//     });
    
//     return terms;
// }


