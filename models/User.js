const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    isHost: {
        type: Boolean,
        default: false
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema)