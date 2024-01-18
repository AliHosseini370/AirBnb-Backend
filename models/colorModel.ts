import mongoose from "mongoose";

interface IColor {
    title: string,
    value: string,
    storeId: mongoose.Types.ObjectId
}


const colorSchema = new mongoose.Schema<IColor> ({
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

const Color = mongoose.model('Color', colorSchema)
export { Color, IColor }