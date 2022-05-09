import mongoose from "mongoose";


const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'The name is required']
    },
    
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'The password is required']
    },

    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

    state: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },  
    
})


export default mongoose.model('User', UserSchema)