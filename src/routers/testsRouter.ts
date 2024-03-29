import {Router} from "express";
import { createTest, getTestsByDiscipline, getTestsByTeachers } from "../controllers/testsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import testSchema from "../schemas/testSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js"

const testsRouter = Router();

testsRouter.post("/tests",validateToken, validateSchema(testSchema), createTest);
testsRouter.get("/tests",validateToken, getTestsByDiscipline);
testsRouter.get("/tests/teachers",validateToken, getTestsByTeachers);

export default testsRouter;