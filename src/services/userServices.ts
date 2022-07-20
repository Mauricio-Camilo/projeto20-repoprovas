import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "./../repositories/userRepository.js";
import { CreateSignUpData } from "./../repositories/userRepository.js";

dotenv.config({ path: ".env" });

export interface CreateUserData {
    email: string;
    password: string;
    confirmPassword: string; 
};

export async function createUser (user : CreateUserData) {

    const {email, password, confirmPassword} = user;

    // PERGUNTAR SE PRECISA DESSA CONFIRMAÇÃO

    if (password !== confirmPassword) {
        throw {
            name: "validationError",
            message: "Incorrect password confirmation"
        }
    }

    const checkEmail = await userRepository.findEmail(email);

    if (checkEmail) {
        throw {
            name: "alreadyExists",
            message: "Email already exists"
        }
    }

    const cryptedPassword = cryptPassword(password);

    await userRepository.createUser({email, password: cryptedPassword});
}

export function cryptPassword (password : string) {
    const SALT = 10;
    const cryptedPassword = bcrypt.hashSync(password, SALT);
    return cryptedPassword;
}

export async function login (login : CreateSignUpData) {

    const user = await checkLogin(login);

    let token = jwt.sign({userId : user.id}, process.env.JWT_SECRET);

    return token;
}

export async function checkLogin (login : CreateSignUpData) {

    const {email, password} = login

    const user = await userRepository.searchUserByEmail(email);

    if (!user) {
        throw {
            name: "notFound",
            message: "User not found"
        }
    }

    const checkPassword = bcrypt.compareSync(login.password, user.password);

    if (!checkPassword) {
        throw {
            name: "notAuthorized",
            message: "Incorrect password"
        }
    }

    return user;

}

export async function findUserById (id : number) {
    
    const user = await userRepository.findById(id);
    if (!user) {
        throw {
            name: "notFound",
            message: "User not found"
        }
    }
  
    return user;
}