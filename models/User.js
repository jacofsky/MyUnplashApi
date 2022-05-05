import mongoose from "mongoose";


const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },

    rol: {
        type: String,
        required: true,
        // revisar aca que peude haber un error !!
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