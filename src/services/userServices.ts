import bcrypt from "bcrypt";
import * as userRepository from "./../repositories/userRepository.js";

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