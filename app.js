import Server from './server/Server.js'
import dotenv from 'dotenv'


dotenv.config()

const server = new Server()

server.listen()