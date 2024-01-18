import mongoose from "mongoose";

interface ICategory {
    title: string,
    billboard: mongoose.Types.ObjectId,
    products?: mongoose.Types.ObjectId[],
    storeId: mongoose.Types.ObjectId
}

const categorySchema = new mongoose.Schema<ICategory> ({
    title: {
        type: String,
        required: true
    },
    billboard: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'BillBoard'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }
})

const Category = mongoose.model('Category', categorySchema)
export { Category, ICategory}