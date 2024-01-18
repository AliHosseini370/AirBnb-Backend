const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema ({
    guest: {
        type: mongoose.Schema.Types.ObjectId, //User ID of the guest
        ref: 'User',
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId, //Listing Id
        ref: 'Listing',
        required: true
    },
    startDate: {
        type: Date,
        requried: true
    },
    endDate: {
        type: Date,
        requried: true
    },
    totalPrice: {
        type: Number,
        requried: true
    },
    // paymentStatus: {
    //     type: String, // Pending, Paid, Cancelled
    //     requried: true //set the paymentStatus to Pending when a booking is created, to Paid when the payment is processed, and to Cancelled if the payment fails or the booking is cancelled.
    // },
}, {timestamps : true})

module.exports = mongoose.model('Booking', bookingSchema)