const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const User = require('../models/User')

//add admin auth later to get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).sort({ createdAt: -1 })
        if (!bookings) {
            return res.status(404).json({error: 'Cant Find Any Bookings'})
        }
        res.status(200).json(bookings)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getBooking = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const booking = await Booking.findById(id)
        if (!booking) {
            return res.status(404).json({error: 'Cant Find Any Booking'})
        }
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({error: error.message})  
    }
}

// create booking (add stripe and payment later)
const createBooking = async (req ,res) => {
    const { listing, startDate, endDate, totalPrice } = req.body
    if (!mongoose.Types.ObjectId.isValid(listing)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const booking = await Booking.create({guest: req.user, listing, startDate, endDate, totalPrice})
        if (!booking) {
            return res.status(400).json({error: 'something went wrong'})
        }
        const userBookingsUpdate = await User.findByIdAndUpdate(req.user, { $push: { bookings: booking._id}})
        if (!userBookingsUpdate) {
            return res.status(400).json({error: 'something went wrong'})
        }
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//edit a booking
const editBooking = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const booking = await Booking.findById(id)
        if (req.user !== String(booking.guest)) {
            return res.status(401).json({error: 'you are not authorized to edit this booking'})
        }
        const updateBooking = await Booking.findByIdAndUpdate( id, req.body, {new: true})
        if (!updateBooking) {
            return res.status(400).json({error: 'Failed to Edit Booking :('})
        }
        res.status(200).json(updateBooking)
    } catch (error) {
        return res.status(400).json({error: error.message}) 
    }
}

//cancel a booking (handle payment later)
const deleteBooking = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const booking = await Booking.findById(id)
        if (req.user !== String(booking.guest)) {
            return res.status(401).json({error: 'you are not authorized to Delete this booking'})
        }
        const deleteBooking = await Booking.findByIdAndDelete(id)
        if (!deleteBooking) {
            return res.status(400).json({error: 'Failed to Delete Booking :('})
        }
        const userBookingsUpdate = await User.findByIdAndUpdate(req.user, { $pull: { bookings: id}})
        if (!userBookingsUpdate) {
            return res.status(400).json({error: 'Failed to update user data and delete booking :('})
        }
        res.status(200).json(deleteBooking)
    } catch (error) {
        return res.status(400).json({error: error.message}) 
    }
}

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    editBooking,
    deleteBooking
}