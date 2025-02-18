import { Router } from 'express';
import { check } from 'express-validator';
import { updateComent } from '../comentarios/comentarios-controller.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.put(
    '/:id',
    [
        validarJWT,
        validarCampos
    ],
    updateComent
)

export default router;