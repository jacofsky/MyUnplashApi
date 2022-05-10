import mongoose from "mongoose";

const ImageSchma = mongoose.Schema({
    link: {
        type: String,
        required: [true, 'The link is required']
    },
    label: {
        type: String,
        required: [true, 'The label is required']

    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user is required']
    }
})


export default mongoose.model('Image', ImageSchma)