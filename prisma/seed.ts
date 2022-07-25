import prisma from "./../src/config/database.js";

const terms = [
    {number:1},
    {number:2},
    {number:3},
    {number:4},
    {number:5},
    {number:6}
]

const disciplines = [
    {name: "HTML e CSS", termId: 1},
    {name: "Javascript", termId: 2},
    {name: "React", termId: 3},
    {name: "Humildade", termId: 4},
    {name: "Planejamento", termId: 5},
    {name: "Autoconfiança", termId: 6}
]

const categories = [
    {name: "Projeto"},
    {name: "Prática"},
    {name: "Recuperação"},
]

const teachers = [
    {name: "Diego Pinho"},
    {name: "Bruna Hamori"}
]

const teachersDisciplines = [
    {teacherId: 1, disciplineId: 1},
    {teacherId: 1, disciplineId: 2},
    {teacherId: 1, disciplineId: 3},
    {teacherId: 2, disciplineId: 4},
    {teacherId: 2, disciplineId: 5},
    {teacherId: 2, disciplineId: 6}
]   

const disciplinesCategories = [
    {disciplineId: 1, categoryId: 1},
    {disciplineId: 1, categoryId: 3},
    {disciplineId: 4, categoryId: 2},
    {disciplineId: 4, categoryId: 3}
]

const teachersCategories = [
    {teacherId: 1, categoryId: 1},
    {teacherId: 1, categoryId: 3},
    {teacherId: 2, categoryId: 2},
    {teacherId: 2, categoryId: 3}
]

async function main () {
    await prisma.term.createMany({data : terms});
    await prisma.discipline.createMany({data : disciplines});
    await prisma.category.createMany({data : categories});
    await prisma.teacher.createMany({data : teachers});
    await prisma.teachersDisciplines.createMany({data : teachersDisciplines});
    await prisma.disciplinesCategories.createMany({data : disciplinesCategories});
    await prisma.teachersCategories.createMany({data : teachersCategories});
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})