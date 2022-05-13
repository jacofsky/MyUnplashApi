import Router from "express";
import { check } from "express-validator";

import { createUser, loginUser, renewToken } from "../controller/AuthController.js";
import fieldValidation from "../middlewares/fieldValidation.js";


const route = Router()

route.post('/register', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must have more than 6 characters').isLength({min: 6}),
    fieldValidation
], createUser)

route.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'Wrong password').isLength({min: 6}),
    fieldValidation
], loginUser)

route.post('/renew',[
    check('uid', 'The id is required').isMongoId(),
    fieldValidation
], renewToken )

export default route