import express, {Request, Response} from 'express';
import cors from 'cors'
import {routes} from './routes'
import "reflect-metadata"
import {AppDataSource} from './data-source'
import cookieParser from "cookie-parser";

AppDataSource.initialize().then(() => {
    const app = express()
    app.use(express.json())
    app.use(cookieParser());
    app.use(cors())
    
    app.get('/', (req: Request, res: Response)=> {
        res.send( 'helow')
    })
    
    routes(app)
    
    const PORT = 5000
    
    app.listen(PORT,()=>{
        console.log(`listening port:${PORT}`)
    })
}).catch(error => console.log(error))
