import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN)
        console.log('BD Online')
    } catch (error) {
        console.log('Failed to connect to database connection')
    }
}