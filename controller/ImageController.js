import bcryptjs from "bcryptjs"
import Image from "../models/Image.js"
import User from "../models/User.js"

export const getImages = async(req, res) => {

    try {
        
        const {limit = 15, skip = 0} = req.query

        const [ count, images ] = await Promise.all([
            Image.countDocuments({state: true}),
            Image.find({state: true})
                .skip(skip)
                .limit(limit)
        ])
    
    
        res.status(200).json({
            count,
            images
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }
}

export const getUserImages = async(req, res) => {
    try {
        const {_id} = req.user

        const {limit = 15, skip = 0} = req.query

        const [ count, images ] = await Promise.all([
            Image.countDocuments({state: true, user: _id}),
            Image.find({state: true, user: _id })
                .skip(skip)
                .limit(limit)
        ])
    
    
        res.status(200).json({
            count,
            images
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }
}

export const getByLabelImages = async(req, res) => {

    try {
        
        const {limit = 15, skip = 0} = req.query
        const {search} = req.params

        const query = {state: true, label: {$regex: `.*${search}.*`, $options: 'i'}}

        const [ count, images ] = await Promise.all([
            Image.countDocuments(query),
            Image.find(query)
                .skip(skip)
                .limit(limit)
        ])
    
    
        res.status(200).json({
            count,
            images
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }
}

export const uploadImage = async(req, res) => {

    const {link, label} = req.body

    const user = req.user

    try {

        const image = new Image({link, label, user})

        await image.save()

        res.status(201).json({
            msg: 'Image upload successfully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }
}

export const deleteImage = async(req, res) => {

    const { id } = req.params
    const { password } =  req.body
    const user = req.user

    try {

        const image = await Image.findById(id)


        if(!image || !image.state){
            return res.status(404).json({
                msg: 'Image not found - delete'
            })
        }

        const imageUser = await User.findById(image.user)

        const isValidPassword = bcryptjs.compareSync(password, imageUser.password)

        if (isValidPassword) {

            image.state = false
            await image.save()
            
            return res.status(200).json({
                image,
                msg: 'Image deleted successfully'
            })

        } else {

            const isValidAdminPassword = bcryptjs.compareSync(password, user.password)

            if (user.rol === "ADMIN_ROLE" && isValidAdminPassword) {

                image.state = false
                await image.save()

                return res.status(200).json({
                    image,
                    msg: 'Image deleted successfully'
                })
            } else {
                return res.status(200).json({
                    msg: 'Not authorized action'
                })
            }
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Error - Talk to the administrator'
        })
    }

}