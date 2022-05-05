import Router from "express";
import { check } from "express-validator";

import { createUser, loginUser } from "../controller/AuthController.js";
import validarCampos from "../middlewares/validarCampos.js";
import validarRoles from "../middlewares/validarRoles.js";


const route = Router()

route.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña debe tener mas de 6 letras').isLength({min: 6}),
    validarCampos
], createUser)

route.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña no es correcta').isLength({min: 6}),
    validarCampos
], loginUser)

export default route