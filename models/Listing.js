const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listingSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    numberOfBedrooms: {
        type: Number,
        required: true
    },
    numberOfBathrooms: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        required: true //Apartment, House, Villa, etc.
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    host: {
        type: mongoose.Schema.Types.ObjectId, // User ID of the host
        ref: 'User',
        required: true
    },
    availability: [{
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, //Array of review IDs
        ref: 'Review'
    }]
}, {timestamps : true})

module.exports = mongoose.model('Listing', listingSchema)