const express = require('express')
const { getUserId } = require('../middleware/getUserId')
const { getReviews, getReview, createReview, editReview, deleteReview } = require('../controllers/reviewController')


const router = express.Router()

//get all reviews of a listing
router.get('/listing/:id', getReviews)

//get a single review
router.get('/:id', getReview)

//create a new review
router.post('/', getUserId, createReview)

//edit a review
router.patch('/:id', getUserId, editReview)

//delete a review
router.delete('/:id', getUserId, deleteReview)

module.exports = router