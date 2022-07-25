import { Request, Response } from "express";
import * as testService from "./../services/testService.js"

export async function createTest (req : Request, res : Response) {

    const {name, pdfUrl, categoryId, disciplineId, teacherId} = req.body;

    await testService.createTest({name, pdfUrl, categoryId, disciplineId, teacherId});
   
    res.sendStatus(201)
}

export async function getTestsByDiscipline (req : Request, res : Response) {

    const tests = await testService.getTestsByDiscipline();

    res.send(tests);
}

export async function getTestsByTeachers (req : Request, res : Response) {

    const tests = await testService.getTestsByTeachers();

    res.send(tests);
}



