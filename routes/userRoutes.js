const express = require('express')
const { getUserId } = require('../middleware/getUserId')
const { getUsers, getUser, getUserBookings, getUserListings, userSignup, userLogin, editUser, deleteUser } = require('../controllers/userController')


const router = express.Router()

//get all users
router.get('/', getUsers)

//get a single User
router.get('/:id', getUser)

//get a users listings
router.get('/listings/:id', getUserListings)

//get a users Bookings
router.get('/bookings/:id', getUserId, getUserBookings)

//create a new user
router.post('/signup', userSignup)

//Login User
router.post('/login', userLogin)

//edit a user
router.patch('/:id', getUserId, editUser)

//delete a user
router.delete('/:id', getUserId, deleteUser)

module.exports = router