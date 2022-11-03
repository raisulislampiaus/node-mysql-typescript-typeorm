import { Request, Response } from "express";
import { RegisterValidation } from "../validation/registerValidation";
import { User } from "../model/userMosel";

import bcyptjs from 'bcryptjs'
import {AppDataSource} from '../data-source'
import { sign, verify } from "jsonwebtoken";


export const Register =  async(req: Request, res: Response) => {
    const body =  req.body
   

    const {error} = RegisterValidation.validate(body)


    if(error){
        return res.status(400).send(error.details);
    }


    if(body.password !== body.password_confirm){
        return res.status(400).send({
          message: "Password do not match"
        });
    }
    
    const user = new User()
    user.first_name = body.first_name,
    user.last_name = body.last_name,
    user.email = body.email,
    user.password= await bcyptjs.hashSync(body.password, 10)
    await AppDataSource.manager.save(user)
    res.send(user)

}

export const Login = async(req: Request, res: Response) => {
    const photoRepository = AppDataSource.getRepository(User)
    const firstUser = await photoRepository.findOneBy({
      email: req.body.email
    })
    if(!firstUser){
        return res.status(400).send({
            message: "User not found"
          });
    }
    if(!await bcyptjs.compare(req.body.password, firstUser.password)){
        return res.status(400).send({
            message: "Invalid credential"
          });
    }

    const token = sign({id: firstUser.id}, 'secret');
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.send({token,firstUser,
        message: 'success login'
    });

}

export const AuthenticatedUser = async (req: Request, res: Response) => {
  try{
      const jwt = req.cookies['jwt'];
      const payload: any = verify(jwt, 'secret');
      if(!payload){
        return res.status(401).send({
          message: "unauthenticated"
        });
      }

        const photoRepository = AppDataSource.getRepository(User)
        const firstUser = await photoRepository.findOneBy(payload.id)
        res.send(firstUser)
  }catch (e){
    return res.status(401).send({
      message: "unauthenticated"
    });
  }
}

export const Logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {maxAge: 0})
  res.send({
    message: 'success'
  })
}