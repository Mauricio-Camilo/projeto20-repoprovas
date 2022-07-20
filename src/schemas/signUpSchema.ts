import joi from "joi";
import { CreateUserData } from "./../services/userServices.js"

const signUpSchema = joi.object<CreateUserData>({
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
    confirmPassword: joi.ref('password')
});

export default signUpSchema;