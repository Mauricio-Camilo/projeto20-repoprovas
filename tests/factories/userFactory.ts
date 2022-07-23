import prisma from "./../../src/config/database.js";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';

export function createSignUp (email = "teste1@teste.com", passwordLength = 8) {
    const password = faker.internet.password(passwordLength);
    return ({
        email,
        password,
        confirmPassword: password
    })
}

export function createLogin (email = "teste1@teste.com", passwordLength = 8) {
    const password = faker.internet.password(passwordLength);
    return ({
        email,
        password,
    })
}
interface Login {
    email: string
    password: string
}

export async function createUser (login: Login) {
    const {email, password} = login
    const user = await prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password,10)
        }
    });
    delete user.id
    return {...user, password: password};
}
