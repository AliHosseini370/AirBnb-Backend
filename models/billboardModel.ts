import mongoose from "mongoose";

interface IBillboard {
    lable: string,
    image: string,
    storeId: mongoose.Types.ObjectId
}


const billboardSchema = new mongoose.Schema<IBillboard> ({
    lable: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }
})

const BillBoard = mongoose.model('BillBoard',billboardSchema)
export { BillBoard, IBillboard}