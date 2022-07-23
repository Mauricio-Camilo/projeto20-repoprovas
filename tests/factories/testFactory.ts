import prisma from "./../../src/config/database.js";

export function createTestData () {
    return ({
        name: "AdminTest",
        pdfUrl: "adminPdfUrl",
        categoryId: 3,
        disciplineId: 1,
        teacherId: 1
    })
}

interface Test {
    name: string
    pdfUrl: string
    categoryId: number
    disciplineId: number
    teacherId: number
}

export async function saveTest (test: Test) {
    await prisma.test.create({
        data: test
    })
}



