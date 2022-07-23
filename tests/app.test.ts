import prisma from "./../src/config/database.js";
import supertest from "supertest";
import app from "./../src/app.js";
import dotenv from "dotenv";

dotenv.config();

const EMAIL = "teste1@email.com";
const PASSWORD = "abcde";
const CONFIRMPASSWORD = "abcde";
const WRONGPASSWORD = "12345";

const signup = {email: EMAIL, password: PASSWORD, confirmPassword: CONFIRMPASSWORD};
const login = {email: EMAIL, password: PASSWORD};
const wrongSignup = {email: EMAIL, password: PASSWORD, confirmPassword: WRONGPASSWORD};
const wrongLogin = {email: EMAIL, password: WRONGPASSWORD};

describe("User tests suite", () => {

    it("given email and password, create user", async () => {
        await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste1@email.com'`;

        const response = await supertest(app).post("/signup").send(signup);
        expect (response.statusCode).toBe(201);

        const user = await prisma.user.findUnique({where : {email: login.email}});
        expect(user.email).toBe(login.email);
    });

    it("given email and password, login the user", async () => {
        const response = await supertest(app).post("/signin").send(login);
        const token = response.text;
        expect(token).not.toBeUndefined();
    })

    it("given email already in use, fail to create user", async () => {
      const response = await supertest(app).post("/signup").send(signup);
      expect (response.statusCode).toBe(409);
    })

    it("given incorrect password confirmation, fail to create user", async () => {
        await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste1@email.com'`;
        const response = await supertest(app).post("/signup").send(wrongSignup);
        expect (response.statusCode).toBe(422);
    })

    it("given inexistent email, fail to login the user", async () => {
        const response = await supertest(app).post("/signin").send(login);
        expect (response.statusCode).toBe(404);
    })

    it("given incorrect password, fail to login the user", async () => {
        await supertest(app).post("/signup").send(signup);
        const response = await supertest(app).post("/signin").send(wrongLogin);
        expect (response.statusCode).toBe(401);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})