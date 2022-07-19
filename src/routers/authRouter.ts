import {Router} from "express";
import { createUser } from "../controllers/authController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js"
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.use("/signup", validateSchema(signUpSchema), createUser)

export default authRouter;