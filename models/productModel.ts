import mongoose from "mongoose";

interface IProduct {
    title: string,
    images: string[],
    price: number,
    category: mongoose.Types.ObjectId,
    color?: mongoose.Types.ObjectId,
    size?: mongoose.Types.ObjectId,
    quantity?: number,
    featured: boolean,
    archived: boolean,
    storeId: mongoose.Types.ObjectId
}


const productSchema = new mongoose.Schema<IProduct> ({
    title: {
        type: String,
        required: true
    },
    images: [{
        type:String,
        required:true
    }],
    price: {
        type:Number,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Category'
    },
    color : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    size : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size'
    },
    quantity: {
        type: Number,
    },
    featured: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    storeId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }

})

const Product = mongoose.model('Product', productSchema)

export { Product, IProduct }