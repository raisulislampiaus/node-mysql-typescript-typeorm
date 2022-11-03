import { Request, Response } from "express";
import { RegisterValidation } from "../validation/registerValidation";
import { User } from "../model/userMosel";

import bcyptjs from 'bcryptjs'
import {AppDataSource} from '../data-source'
import { sign, verify } from "jsonwebtoken";


export const Users =async (req: Request, res: Response) => {
    const photoRepository = AppDataSource.getRepository(User)
    const firstUser = await photoRepository.find()
    res.send(firstUser.map(f => {
        const {password, ...data} = f;
        return data
    }))
}