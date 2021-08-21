const Campground = require('../models/campground')
const Review = require('../models/reviews')

module.exports.createReview =  async(req,res)=>{
    const camp = await  Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    camp.reviews.push(review)
    
    camp.save()
    review.save()
    req.flash('success','Review created successfully')
    res.redirect(`/campgrounds/${camp._id}`)
}

module.exports.deleteReview = async(req,res)=>{
    const {id , reviewId} = req.params
    const camp = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success','Review deleted succesfully')
    res.redirect(  `/campgrounds/${id}`)
    

}