import mongoose from "mongoose";

interface IOrder {
    fullName: string,
    email: string,
    phoneNumber: string,
    products: mongoose.Types.ObjectId[],
    totalPrice: number,
    address: string,
    zipCode: string,
    paid?: boolean,
    storeId: mongoose.Types.ObjectId
}


const orderSchema = new mongoose.Schema<IOrder> ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }
})

const Order = mongoose.model('Order', orderSchema)
export { Order, IOrder}