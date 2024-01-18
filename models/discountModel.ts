import mongoose from "mongoose";

interface IDiscount {
    title: string,
    code: string,
    amount: number,
    storeId: mongoose.Types.ObjectId
}


const discountSchema = new mongoose.Schema<IDiscount> ({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }
})

const Discount = mongoose.model('Discount', discountSchema)
export { Discount, IDiscount}