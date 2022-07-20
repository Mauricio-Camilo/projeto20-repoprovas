import joi from "joi";
import { User } from "@prisma/client";

const loginSchema = joi.object<User>({
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
});

export default loginSchema;