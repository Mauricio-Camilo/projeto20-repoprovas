import joi from "joi";

const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
    confirmPassword: joi.ref('password')
});

export default signUpSchema;