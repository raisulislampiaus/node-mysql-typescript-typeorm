import { Request, Response } from "express";
import {AppDataSource} from '../data-source'
import { Product } from "../model/productsModel";

export const createProducts =  async(req: Request, res: Response) => {
    const product = new Product()
    product.title = req.body.title
    product.description = req.body.description
    product.image = req.body.image
    product.price= req.body.price
    await AppDataSource.manager.save(product)
    res.send(product)
}

export const AllProducts =async (req: Request, res: Response) => {
    const photoRepository = AppDataSource.getRepository(Product)
    const firstUser = await photoRepository.find()
    res.send(firstUser.map(f => {
        const {...data} = f;
        return data
    }))
}


export const UpdateProducts =async (req: Request, res: Response) => {
    const photoRepository = AppDataSource.getRepository(Product)
    await photoRepository.update(req.params.id, req.body)
    res.status(204).send('update success');
}

