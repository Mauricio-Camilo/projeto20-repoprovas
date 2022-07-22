import prisma from "./../src/config/database.js";

/* Pra funcionar essa configuração que vai alimentar o banco de dados auxiliar,
é necessário adicionar no package json o prisma e indicar esse arquivo pra rodas
ao iniciar o teste
*/

//COLOCAR AQUI AS INSERÇÕES MANUIAS PASSADAS NO PROJETO

async function main () {
    // await prisma.user.create({
    //     data: {
    //         email:"emailTeste5@email.com",
    //         password:"abcde"
    //     }
    // })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})