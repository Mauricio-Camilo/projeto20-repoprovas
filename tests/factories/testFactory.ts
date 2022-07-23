import prisma from "./../../src/config/database.js";

export function createTest () {
    return ({
        name: "AdminTest",
        pdfUrl: "adminPdfUrl",
        categoryId: 3,
        disciplineId: 1,
        teacherId: 1
    })
}

