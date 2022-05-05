import express from "express"
import cors from "cors"

import ImageRoute from "../routes/ImageRoute.js"
import AuthRoute from "../routes/AuthRoute.js"
import { connectDB } from "../database/database.js"

class Server {

    constructor() {
        
        this.app = express()
        this.port = process.env.PORT

        this.path = {
            image: '/image',
            auth: '/auth'
        }

        this.database()

        this.middlewares()

        this.routes()

    }

    database() {
        connectDB()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.path.image, ImageRoute)
        this.app.use(this.path.auth, AuthRoute)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on in: ${this.port} PORT`)
        })
    }


}

export default Server