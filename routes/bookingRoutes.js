const express = require('express')
const { getUserId } = require('../middleware/getUserId')
const { getBookings, getBooking, createBooking, editBooking, deleteBooking } = require('../controllers/bookingController')

const router = express.Router()

//get all bookings
router.get('/', getBookings)

//get a single booking
router.get('/:id', getBooking)

//create a new booking
router.post('/', getUserId, createBooking)

//edit a booking
router.patch('/:id', getUserId, editBooking)

//delete a booking
router.delete('/:id', getUserId, deleteBooking)

module.exports = router