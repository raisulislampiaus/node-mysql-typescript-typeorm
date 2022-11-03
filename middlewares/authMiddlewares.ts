import { Request, Response } from "express";
import { RegisterValidation } from "../validation/registerValidation";
import { User } from "../model/userMosel";

import bcyptjs from 'bcryptjs'
import {AppDataSource} from '../data-source'
import { sign, verify } from "jsonwebtoken";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];
        const payload: any = verify(jwt, 'secret');
        if(!payload){
          return res.status(401).send({
            message: "unauthenticated"
          });
        }
  
          const photoRepository = AppDataSource.getRepository(User)
          const firstUser = await photoRepository.findOneBy(payload.id)
         next() 
    } catch (error) {
        return res.status(401).send({
            message: "unauthenticated"
        })
    }
}