import supertest from "supertest";
import app from "./../src/app.js"

const EMAIL = "teste3@email.com";
const PASSWORD = "abcde";
const CONFIRMPASSWORD = "abcde";
const signup = {email: EMAIL, password: PASSWORD, confirmPassword: CONFIRMPASSWORD};
const login = {email: EMAIL, password: PASSWORD};

describe("User tests suite", () => {

    it("given email and password, create user", async () => {
        const response = await supertest(app).post("/signup").send(signup);
        const status = response.status;
        expect (status).toBe(201);
    });

    it("given email and password, login the user", async () => {
        const response = await supertest(app).post("/signin").send(login);
        const token = response.body.token;
        expect (token).not.toBeNull();
    })

    it("given email and password already in use, fail to create user", async () => {
      const response = await supertest(app).post("/signup").send(signup);
      expect (response.statusCode).toBe(409);
    })
})