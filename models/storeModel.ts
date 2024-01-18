import mongoose from "mongoose";

interface IStore {
    storeName: string,
    zarinMerchant: string
}

const storeSchema = new mongoose.Schema<IStore> ({
    storeName : {
        type: String,
        required: true
    },
    zarinMerchant: {
        type: String,
        required: true
    }
})

const Store = mongoose.model('Store', storeSchema)

export { Store, IStore}