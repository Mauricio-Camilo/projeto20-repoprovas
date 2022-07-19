import prisma from "./../config/database.js";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id">

export async function findEmail (email : string) {
    const users = await prisma.user.findUnique({where : {email}});
    return users;
}

export async function createUser (user : CreateUserData) {
    await prisma.user.create({data : user})
}
