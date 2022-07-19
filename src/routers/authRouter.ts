import {Router} from "express";
import { createUser, login } from "../controllers/authController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js"
import signUpSchema from "../schemas/signUpSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.use("/signup", validateSchema(signUpSchema), createUser);
authRouter.use("/signin", validateSchema(loginSchema), login);

export default authRouter;