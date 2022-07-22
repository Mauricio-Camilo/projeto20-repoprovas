import prisma from "./../src/config/database.js";
import supertest from "supertest";
import app from "./../src/app.js";
import dotenv from "dotenv";
/* com isso ele vai chamar o banco auxiliar, configurado no package.json
configurado pelo dotenv -e .env.test*/
dotenv.config();

const EMAIL = "teste1@email.com";
const PASSWORD = "abcde";
const CONFIRMPASSWORD = "abcde";
const signup = {email: EMAIL, password: PASSWORD, confirmPassword: CONFIRMPASSWORD};
const login = {email: EMAIL, password: PASSWORD};

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste1@email.com'`;
})

// beforeEach(async () => {
//     const user = await prisma.$executeRaw`SELECT * FROM users`;
//     console.log(user);
//     await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste1@email.com'`;
// })

describe("User tests suite", () => {

    it("given email and password, create user", async () => {
        const response = await supertest(app).post("/signup").send(signup);

        /* A validação da response foi verificada, então verificar agora
        se o usuário foi realmente criado fazendo uma validação simples */

        const user = await prisma.user.findUnique({where : {email: login.email}});

        // console.log(user);

        expect(user.email).toBe(login.email);
    });

    it("given email and password, login the user", async () => {

        await supertest(app).post("/signup").send(signup);

        const response = await supertest(app).post("/signin").send(login);
        const token = response.text;

        console.log(token);

        expect(token).not.toBeUndefined();
    })

    it("given email and password already in use, fail to create user", async () => {
      const response = await supertest(app).post("/signup").send(signup);
      expect (response.statusCode).toBe(201);
      const response2 = await supertest(app).post("/signup").send(signup);
      expect (response2.statusCode).toBe(409);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})