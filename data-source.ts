import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/userMosel"
import { Product } from "./model/productsModel"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "piaus123",
    database: "try",
    entities: [
       User,
       Product
    ],
    synchronize: true,
    logging: false,
})
