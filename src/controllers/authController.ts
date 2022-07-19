import { Request, Response } from "express";
import * as userServices from "./../services/userServices.js"

export async function createUser (req : Request, res : Response) {

    const {email, password, confirmPassword} = req.body;

    await userServices.createUser({email, password, confirmPassword});

    res.sendStatus(201);
}

export async function login (req : Request, res : Response) {

    const {email, password} = req.body;

    const token = await userServices.login({email, password});

    res.status(200).send(token);
}
