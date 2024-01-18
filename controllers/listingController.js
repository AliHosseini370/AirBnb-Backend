const Listing = require('../models/Listing')
const mongoose = require('mongoose')
const User = require('../models/User')


//get all listings
const getListings = async (req, res) => {
    try {
        const listings = await Listing.find({}).sort({ createdAt: -1})
        if (!listings) {
            return res.status(404).json({error: 'Cant Find Any Listings'})
        }
        res.status(200).json(listings)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

//get a listing
const getListing = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Listing'})
    }
    try {
        const listing = await Listing.findById(id)
        if (!listing) {
            return res.status(404).json({error: 'No Such Listing'})
        }
        res.status(200).json(listing)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

//create listing
const createListing = async (req, res) => {
    const { title, description, price, numberOfGuests, numberOfBedrooms, numberOfBathrooms, propertyType, location, address, images, availability } = req.body
    try {
        const listing = await Listing.create({title, description, price, numberOfGuests, numberOfBedrooms, numberOfBathrooms, propertyType, location, address, images, availability, host: req.user})
        if (!listing) {
            return res.status(400).json({error: 'Failed to create Listing'})
        }
        const userListing = await User.findByIdAndUpdate(req.user, { $push: { listings: listing._id}})
        if (!userListing) {
            return res.status(400).json({error: 'failed to update the user data'})
        }
        res.status(200).json(listing)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//edit listing
const editListing = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Listings :('})
    }
    const listing = await Listing.findById(id)
    if (req.user !== String(listing.host)) {
        return res.status(401).json({error: 'You Are Not Authorized To Edit This Listing'})
    }
    try {
        const newListing = await Listing.findByIdAndUpdate(id, req.body, { new: true })
        if (!newListing) {
            return res.status(400).json({error: 'Could Not Update :('})
        }
        res.status(200).json(newListing)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//delete listings
const deleteListing = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Listings :('})
    }
    try {
        const listing = await Listing.findById(id)
        if (req.user !== String(listing.host)) {
            return res.status(401).json({error: 'You Are Not Authorized To Edit This Listing'})
        }
        const deletelisting = await Listing.findByIdAndDelete(id)
        if (!deletelisting) {
            return res.status(404).json({error: 'No such Listings :('})
        }
        const userListingUpdate = await User.findByIdAndUpdate(req.user, { $pull: { listings: id}})
        if (!userListingUpdate) {
            return res.status(400).json({error: 'failed to update the user data'})
        }
        res.status(200).json(deletelisting)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getListings,
    getListing,
    createListing,
    editListing,
    deleteListing
}