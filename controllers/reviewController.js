const mongoose = require('mongoose')
const Review = require('../models/Review')
const Listing = require('../models/Listing')

//get all reviews of a listing
const getReviews = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const listing = await Listing.findById(id).populate('reviews')
        if (!listing) {
            return res.status(404).json({error: 'Cant Find Any Reviws'})
        }
        res.status(200).json(listing.reviews)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//get a single review
const getReview = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const review = await Review.findById(id)
        if (!review) {
            return res.status(404).json({error: 'Cant Find Any Review'})
        }
        res.status(200).json(review)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//create a review
const createReview = async (req, res) => {
    const { listingId, rating, comment } = req.body
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const review = await Review.create({author: req.user, listing: listingId, rating, comment})
        if (!review) {
            return res.status(400).json({error: 'Failed to Create review :('})
        }
        const listing = await Listing.findByIdAndUpdate(listingId, { $push: { reviews: review._id}})
        if (!listing) {
            return res.status(400).json({error: 'Failed to Update Listings Review :('})
        }
        res.status(200).json(listing)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//Edit a review
const editReview = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const review = await Review.findById(id)
        if (req.user !== String(review.author)) {
            return res.status(401).json({error: 'you are not authorized to edit this review'})
        }
        const updateReview = await Review.findByIdAndUpdate( id, req.body, {new: true})
        if (!updateReview) {
            return res.status(400).json({error: 'Failed to Edit review :('})
        }
        res.status(200).json(updateReview)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//delete a review
const deleteReview = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Enter a valid id'})
    }
    try {
        const review = await Review.findById(id)
        if (req.user !== String(review.author)) {
            return res.status(401).json({error: 'you are not authorized to Delete this review'})
        }
        const deleteReview = await Review.findByIdAndDelete(id)
        if (!deleteReview) {
            return res.status(400).json({error: 'Failed to Delete review :('})
        }
        res.status(200).json(deleteReview)
    } catch (error) {
        return res.status(400).json({error: error.message})  
    }
}

module.exports = {
    getReviews,
    getReview,
    createReview,
    editReview,
    deleteReview
}