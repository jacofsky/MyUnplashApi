import bcryptjs from "bcryptjs"
import { request, response } from "express"
import { generateJWT } from "../helpers/generateJWT.js"
import Usuario from "../models/User.js"

export const createUser = async(req = request, res = response) => {

    const { name, email, password } = req.body

    try {
        const rol = 'USER_ROLE'
        const usuario = new Usuario({name, email, password, rol})
    
        const verifyEmail = await Usuario.findOne({email})
    
        if (verifyEmail) {
            return res.status(400).json({
                msg: 'Correo existente'
            })
        }
    
    
    
        const salt = await bcryptjs.genSalt()
        usuario.password = await bcryptjs.hash(password, salt)
    
        await usuario.save()
    
        const token = await generateJWT(usuario._id)
        
        res.status(201).json({usuario, token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    

}

export const loginUser = async(req = request, res = response) => {

    
    try {
        const {email, password} = req.body
    
        const user = await Usuario.findOne({email})

        if(!user) {
            res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            })
        }

        if (!user.state) {
            res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            })
        }

        const token = await generateJWT(user._id)

        res.status(200).json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}