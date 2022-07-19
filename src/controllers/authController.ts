import { Request, Response } from "express";
import * as userServices from "./../services/userServices.js"

export async function createUser (req : Request, res : Response) {

    const {email, password, confirmPassword} = req.body;

    await userServices.createUser({email, password, confirmPassword});

    res.status(201).send("Criar usuários ativo");
}