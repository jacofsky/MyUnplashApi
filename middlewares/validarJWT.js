import { request } from "express"
import jwt from "jsonwebtoken";
import User from '../models/User.js'

const validarJWT = (req = request, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Token invalido'
            })
        }

        if (!user.estado) {
            return res.status(401).json({
                msg: 'Token invalido'
            })
        }

        req.usuario = user

        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token invalido'
        })
    }

}

export default validarJWT