import mongoose from "mongoose";

interface ISize {
    title: string,
    value: string,
    storeId: mongoose.Types.ObjectId
}


const sizeSchema = new mongoose.Schema<ISize> ({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }
})

const Size = mongoose.model('Size', sizeSchema)
export { Size, ISize}