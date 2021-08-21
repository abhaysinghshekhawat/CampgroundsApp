
module.exports.campValidator = function(req,res,next){
const joi = require('joi')
const AppError = require('../utils/error')
const schemaValidator = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().min(0).required(),
        description: joi.string().required(),
        location: joi.string().required(),
        

    }).required(),
    deleteFiles: joi.array()
})

const {error} = schemaValidator.validate(req.body)
if(error){
    req.flash('error', error.details.map(el=>el.message).join(','))
    res.redirect(`/campgrounds/${req.params.id}/edit`)
    //throw new AppError(error.details.map(el=>el.message).join(','), 400)
}else{
    next()
}
}

module.exports.reviewValidator = function(req,res,next){
    const joi = require('joi')
    const AppError = require('../utils/error')
    const reviewSchemaValidator = joi.object({
        review: joi.object({
            body: joi.string(),
            Rating: joi.number().min(1).max(5).required()
        }).required(),
        rating: joi.string()
    })

    const {error} = reviewSchemaValidator.validate(req.body)
    if(error){
        req.flash('error', error.details.map(el=>el.message).join(','))
        res.redirect(`/campgrounds/${req.params.id}`)
       //throw new AppError(error.details.map(e=>e.message).join(','), 400)
    }else{
        next()
    }
}
