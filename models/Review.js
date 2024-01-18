const mongoose = require('mongoose')


const Schema = mongoose.Schema


const reviewSchema = new Schema ({
    author: {
        type: mongoose.Schema.Types.ObjectId, // User ID of the reviewer
        ref: 'User'
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId, //Listing ID
        ref: 'Listing'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps : true})

module.exports = mongoose.model('Review', reviewSchema)