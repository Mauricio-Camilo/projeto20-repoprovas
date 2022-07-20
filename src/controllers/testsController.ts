import { Request, Response } from "express";
import * as testService from "./../services/testService.js"

export async function createTest (req : Request, res : Response) {

    const {name, pdfUrl, categoryId, teacherDisciplineId} = req.body;

    await testService.createTest({name, pdfUrl, categoryId, teacherDisciplineId});
   
    res.status(201).send("Rota de testes")
}

