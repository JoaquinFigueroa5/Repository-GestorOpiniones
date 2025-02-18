'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth-routes.js';
import userRouter from '../src/users/user-routes.js';
import publicactionRouter from '../src/publication/publication-routes.js'

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}
const routes = (app) => {
    app.use('/gestorOpiniones/v1/auth', authRoutes),
    app.use('/gestorOpiniones/v1/users', userRouter),
    app.use('/gestorOpiniones/v1/publications', publicactionRouter)
}

const conectarDB = async() => {
    try{
        await dbConnection();
        console.log('Conexion exitosa con la base de datos');
    }catch (error) {
        console.log('Error al conectar con la base de datos', error);
    }

}

export const initServer = async() => {
    const app = express();
    const port = process.env.PORT || 3015;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}