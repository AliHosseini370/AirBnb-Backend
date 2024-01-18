const User = require('../models/User')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3 days'})
}

//add admin auth later to get all users
//get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1})
        if (!users) {
            return res.status(404).json({error: 'Cant Find Any User'})
        }
        res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

//get a user
const getUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({error: 'Cant Find Any User'})
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

//get a users bookings
//only the user himself shoud be able to see his bookings ( safety )
const getUserBookings = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const user = await User.findById(id)
        if (req.user !== user._id) {
            return res.status(401).json({error: 'You Are Not Authorized To See Someone Else Bookings'})
        }
        const userBookings = User.findById(id).populate('bookings')
        if (!userBookings) {
            return res.status(404).json({error: 'Cant Find Any Bookings For This User'})
        }
        res.status(200).json(userBookings)
    } catch (error) {
        return res.status(404).json({error: error.message})  
    }
}

//get users listings, everyone can see a users listings
const getUserListings = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const userListings = User.findById(id).populate('listings')
        if (!userListings) {
            return res.status(404).json({error: 'Cant Find Any Listings For This User'})
        }
        res.status(200).json(userListings)
    } catch (error) {
        return res.status(404).json({error: error.message})  
    }
}

//create user (user signup)
const userSignup = async (req, res) => {
    const { fullName, email, password, profilePicture, phoneNumber, location, isHost } = req.body
    if (!validator.isEmail(email)) {
        return res.status(400).json({error: 'Enter A Valid Email'})
    }
    const exists = await User.findOne({ $or : [ {email}, {phoneNumber} ]})
    if (exists) {
        if (exists.email === email) {
            return res.status(400).json({error: 'Email Already In Use'})
        }
        if (exists.phoneNumber === phoneNumber) {
            return res.status(400).json({error: 'Phone Number Already In Use'})
        }
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({fullName, email, password: hash, profilePicture, phoneNumber, location, isHost})
        const token = createToken(user._id)
        if (!user) {
            return res.status(400).json({error: 'somthing went wrong while trying to register you'})
        }
        res.status(200).json({email, token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//Login User
const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({error: 'Incorrect Email'})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
        return res.status(400).json({error: 'Incorrect Password'})
        }
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//Edit a user
const editUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const editingUser = await Listing.findById(id)
        if (req.user !== editingUser._id) {
            return res.status(401).json({error: 'You Are Not Authorized To Edit This User'})
        }
        const user = await User.findOneAndUpdate({_id: id}, req.body, { new: true})
        if (!user) {
            return res.status(400).json({error: 'Failed to update User'}) 
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'}) 
    }
    try {
        const editingUser = await Listing.findById(id)
        if (req.user !== editingUser._id) {
            return res.status(401).json({error: 'You Are Not Authorized To Delete This User'})
        }
        const user = await User.findOneAndDelete({_id: id})
        if (!user) {
            return res.status(400).json({error: 'Failed to delete User'})  
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}


module.exports = {
    getUsers, getUser, getUserBookings, getUserListings, userSignup, userLogin, editUser, deleteUser
}