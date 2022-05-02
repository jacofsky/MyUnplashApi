import express from "express"
import cors from "cors"
import ImageRoute from '../routes/ImageRoute.js'

class Server {

    constructor() {
        
        this.app = express()
        this.port = process.env.PORT

        this.path = {
            image: '/image'
        }

        this.middlewares()

        this.routes()

    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.path.image, ImageRoute)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on in: ${this.port}`)
        })
    }


}

export default Server