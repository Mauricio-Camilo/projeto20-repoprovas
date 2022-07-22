import joi from "joi";
import { CreateTestData } from "../services/testService";

const testSchema = joi.object<CreateTestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().required(),
    disciplineId: joi.number().required(),
    teacherId: joi.number().required()
});

export default testSchema;