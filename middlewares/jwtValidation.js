import { request } from "express"
import jwt from "jsonwebtoken";
import User from '../models/User.js'

const jwtValidation = async(req = request, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid Token'
            })
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid Token'
            })
        }

        req.user = user

        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Invalid Token'
        })
    }

}

export default jwtValidation