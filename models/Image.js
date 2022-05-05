import { model, Schema } from "mongoose";

const ImageSchma = Schema({
    link: {
        type: String,
        required: [true, 'El link es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    }
})


export default model('Image', ImageSchma)