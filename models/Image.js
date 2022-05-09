import { model, Schema } from "mongoose";

const ImageSchma = Schema({
    link: {
        type: String,
        required: [true, 'The link is required']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The usuario is required']
    }
})


export default model('Image', ImageSchma)