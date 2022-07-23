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

async function generateToken () {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const responseLogin = await supertest(app).post("/signin").send(user);
    const token = responseLogin.text;
    return token;
}

describe("Test tests suite", () => {

    it("create a test", async () => {

        const token = await generateToken();
        
        const test = testFactory.createTest()
        const responseTestCreation = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token}`);
        expect(responseTestCreation.statusCode).toBe(201);

        const checkTest = await prisma.test.findFirst({where: {name: test.name}});
        expect(checkTest.name).toBe(test.name);
    })
})


// describe("User tests suite", () => {

//     it("given email and password, create user", async () => {
//         const signup = userFactory.createSignUp();
//         const response = await supertest(app).post("/signup").send(signup);
//         expect (response.statusCode).toBe(201);

//         const user = await prisma.user.findFirst({where : {email: signup.email}});
//         expect(user.email).toBe(signup.email);
//     });

//     it("given email and password, login the user and receive token", async () => {
//         const login = userFactory.createLogin();
//         const user = await userFactory.createUser(login);

//         const response = await supertest(app).post("/signin").send(user);
//         expect(response.statusCode).toBe(200);

//         const token = response.text;
//         expect(token).not.toBeUndefined();
//     })

//     it("given invalid inputs, fail to create user", async () => {
//         const signup = userFactory.createSignUp("teste_email.com");
//         delete signup.password
//         const response = await supertest(app).post("/signup").send(signup);
//         expect(response.statusCode).toBe(422);
//     })

//     it("given email already in use, fail to create user", async () => {
//         const login = userFactory.createLogin();
//         await userFactory.createUser(login);

//         const signup = userFactory.createSignUp();
//         const response = await supertest(app).post("/signup").send(signup);
//         expect (response.statusCode).toBe(409);
//     })

//     it("given incorrect password confirmation, fail to create user", async () => {
//         const signup = userFactory.createSignUp();
//         signup.confirmPassword = "wrongPassword";

//         const response = await supertest(app).post("/signup").send(signup);
//         expect (response.statusCode).toBe(422);
//     })

//     it("given inexistent email, fail to login the user", async () => {
//         const login = userFactory.createLogin();
//         const user = await userFactory.createUser(login);    
        
//         user.email = "wrongemail@email.com"
//         const response = await supertest(app).post("/signin").send(user);
//         expect (response.statusCode).toBe(404);
//     })

//     it("given incorrect password, fail to login the user", async () => {
//         const login = userFactory.createLogin();
//         const user = await userFactory.createUser(login); 

//         user.password = "wrongpassword"
//         const response = await supertest(app).post("/signin").send(user);
//         expect (response.statusCode).toBe(401);
//     })
// })



afterAll(async () => {
    await prisma.$disconnect();
})