import prisma from "./../src/config/database.js";
import supertest from "supertest";
import app from "./../src/app.js";
import dotenv from "dotenv";
import * as userFactory from "./factories/userFactory.js"
import * as testFactory from "./factories/testFactory.js"

dotenv.config();

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste1@teste.com'`;
    await prisma.$executeRaw`DELETE FROM tests WHERE name = 'AdminTest'`;
})

describe("User tests suite", () => {

    it("given email and password, create user", async () => {
        const signup = userFactory.createSignUp();
        const response = await supertest(app).post("/sign-up").send(signup);
        expect (response.statusCode).toBe(201);

        const user = await prisma.user.findFirst({where : {email: signup.email}});
        expect(user.email).toBe(signup.email);
    });

    it("given email and password, login the user and receive token", async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUser(login);

        const response = await supertest(app).post("/sign-in").send(user);
        expect(response.statusCode).toBe(200);

        const token = response.text;
        expect(token).not.toBeUndefined();
    })

    it("given invalid inputs, fail to create user", async () => {
        const signup = userFactory.createSignUp("teste_email.com");
        delete signup.password;

        const response = await supertest(app).post("/sign-up").send(signup);
        expect(response.statusCode).toBe(422);
    })

    it("given email already in use, fail to create user", async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        const signup = userFactory.createSignUp();
        const response = await supertest(app).post("/sign-up").send(signup);
        expect (response.statusCode).toBe(409);
    })

    it("given incorrect password confirmation, fail to create user", async () => {
        const signup = userFactory.createSignUp();
        signup.confirmPassword = "wrongPassword";

        const response = await supertest(app).post("/sign-up").send(signup);
        expect (response.statusCode).toBe(422);
    })

    it("given inexistent email, fail to login the user", async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUser(login);    
        
        user.email = "wrongemail@email.com"
        const response = await supertest(app).post("/sign-in").send(user);
        expect (response.statusCode).toBe(404);
    })

    it("given incorrect password, fail to login the user", async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUser(login); 

        user.password = "wrongpassword"
        const response = await supertest(app).post("/sign-in").send(user);
        expect (response.statusCode).toBe(401);
    })
})

async function generateToken () {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const response = await supertest(app).post("/sign-in").send(user);
    const token = response.text;
    return token;
}

describe("Test tests suite", () => {

    it("create a test", async () => {
        const token = await generateToken();
        
        const test = testFactory.createTestData();
        const response = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(201);

        const checkTest = await prisma.test.findFirst({where: {name: test.name}});
        expect(checkTest.name).toBe(test.name);
    })

    it("given invalid token, fails to create a test", async () => {
        const token = "invalidToken"
        
        const test = testFactory.createTestData();
        const response = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
    })

    it("given inexistent id, fails to create a test", async () => {
        const token = await generateToken();
        
        const test = testFactory.createTestData();
        test.teacherId = 10;

        const response = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    })

    it("given invalid teacher and discipline ids, fails to create a test", async () => {
        const token = await generateToken();
        
        const test = testFactory.createTestData();
        test.teacherId = 2;

        const response = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
    })

    it("get tests by disciplines", async () => {
        const token = await generateToken();

        const test = testFactory.createTestData();
        await testFactory.saveTest(test);

        const response = await supertest(app).get("/tests").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.body).not.toBeNull();
    })

    it("get tests by teachers", async () => {
        const token = await generateToken();

        const test = testFactory.createTestData();
        await testFactory.saveTest(test);

        const response = await supertest(app).get("/tests/teachers").send(test).set("Authorization", `Bearer ${token}`); 
        expect(response.body).not.toBeNull();
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})