import prisma from "./../config/database.js";
import { User } from "@prisma/client";

export type CreateSignUpData = Omit<User, "id">

export async function findEmail (email : string) {
    const users = await prisma.user.findUnique({where : {email}});
    return users;
}

export async function createUser (user : CreateSignUpData) {
    await prisma.user.create({data : user})
}

export async function searchUserByEmail (email : string) {
    const user = await prisma.user.findUnique({where : {email}})
    return user;
}
