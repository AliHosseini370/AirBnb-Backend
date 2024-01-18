const express = require('express')

const { getListing, getListings, createListing, editListing, deleteListing } = require('../controllers/listingController')
const { getUserId } = require('../middleware/getUserId')

const router = express.Router()

//get all listings
router.get('/', getListings)

//get a single listing
router.get('/:id', getListing)

//create a Listing
router.post('/', getUserId, createListing)

//edit a Listing
router.patch('/:id', getUserId, editListing)

//delete a Listing
router.delete('/:id', getUserId, deleteListing)

module.exports = router