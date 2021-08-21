const mongoose = require('mongoose')
const Review = require('./reviews')

const { reviewValidator } = require('../schemaValidator/joiValidation')

const Schema = mongoose.Schema

const imageSchema = Schema({
    path: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function(){
  return  this.path.replace('/upload','/upload/w_300')
}) 

opts = {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }
  }

const campSchema = Schema({
    
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [imageSchema],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'

    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},opts)

campSchema.virtual('properties.popup').get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>
            <h6>${this.location}</h6>`
})

campSchema.post('findOneAndDelete', async(data)=>{
    if(data){
   await  Review.remove({ _id: {$in: data.reviews} })
    console.log("deleted")
    }
})

module.exports = mongoose.model('Campground',campSchema)
