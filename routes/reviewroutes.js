const express = require('express')
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync')
const {reviewValidator} = require('../schemaValidator/joiValidation') 
const Review = require('../models/reviews')
const Campground = require('../models/campground')
const {isLoggedIn,isReviewAuthor} = require('../middleware')
const reviews = require('../controller/reviewsController')


router.post('/',isLoggedIn,reviewValidator, wrapAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, reviews.deleteReview)




module.exports = router
