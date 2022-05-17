import bcryptjs from "bcryptjs"
import { request, response } from "express"
import { generateJWT } from "../helpers/generateJWT.js"
import User from "../models/User.js"

export const createUser = async(req = request, res = response) => {

    const { name, email, password } = req.body

    try {
        const rol = 'USER_ROLE'
        const user = new User({name, email, password, rol})
    
        const verifyEmail = await User.findOne({email})
    
        if (verifyEmail) {
            return res.status(400).json({
                msg: 'Existing mail'
            })
        }
    
    
    
        const salt = await bcryptjs.genSalt()
        user.password = await bcryptjs.hash(password, salt)
    
        await user.save()
    
        const token = await generateJWT(user._id)
        
        res.status(201).json({user, token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }
    

}

export const loginUser = async(req = request, res = response) => {

    
    try {
        const {email, password} = req.body
    
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                msg: 'Wrong User / Password'
            })
        }

        if (!user.state) {
            return res.status(400).json({
                msg: 'Wrong User / Password'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Wrong User / Password'
            })
        }

        const token = await generateJWT(user._id)

        res.status(200).json({user, token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }


}

export const renewToken = async(req = request, res = response) => {

    try {

        const {uid} = req.body

        const user = User.findById(uid)

        if(!user) {
            return res.status(400).json({
                msg: 'Invalid id'
            })
        }
        
        const token = await generateJWT(uid)
        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }

}