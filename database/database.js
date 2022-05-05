import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN)
        console.log('BD Online')
    } catch (error) {
        console.log('Error en la conexion con la conexion a la base de datos')
    }
}