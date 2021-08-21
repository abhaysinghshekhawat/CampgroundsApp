const Campground = require('../models/campground')
const {cloudinary} = require('../cloudinary/index')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geoClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });



module.exports.index =  async (req,res)=>{

    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{ campgrounds })
}

module.exports.renderNewForm = (req,res)=>{
    
    res.render('campgrounds/new')
    
}

module.exports.showCamp = async (req,res,next)=>{
    const {id} = req.params
    const campground =  await Campground.findById(id).populate('author').populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    if(!campground){
        req.flash('error','cannot find campground')
        return res.redirect('/campgrounds')
    }
    
    res.render('campgrounds/show', { campground })
    
}

module.exports.renderEditForm = async (req,res)=>{
    const campground = await Campground.findById(req.params.id)

    
    if(!campground){
        req.flash('error','cannot find campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit',{campground})

}

module.exports.createCamp = async (req,res)=>{
    
   const geoLocation = await geoClient.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

    
    const camp = new Campground(req.body.campground)
    camp.author = req.user._id
    camp.geometry = geoLocation.body.features[0].geometry
    camp.images = req.files.map(f=>({path: f.path, filename: f.filename}))
    await camp.save()
    console.log(camp)
    req.flash('success','succesfully created the campground')
    res.redirect(`/campgrounds/${camp._id}`)

}

module.exports.editCamp = async (req,res)=>{

    const geoLocation = await geoClient.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

    
    const camp = await Campground.findByIdAndUpdate(req.params.id,req.body.campground,{new: true})
    camp.geometry = geoLocation.body.features[0].geometry
    const imags = req.files.map(f=>({path: f.path, filename: f.filename}))
    camp.images.push(...imags)
    await camp.save()
    if(req.body.deleteFiles){
        for(let fileName of req.body.deleteFiles){
            await cloudinary.uploader.destroy(fileName)
        }
        await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteFiles}}}})
        
    }
   
    req.flash('success','Successfully updated the campground!!')
    res.redirect(`/campgrounds/${camp._id}`)
    

}

module.exports.deleteCamp = async (req,res)=>{
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', 'Successfully deleted the campground')
    res.redirect('/campgrounds')
}

module.exports.searchCamp = async (req,res)=>{

    title = req.body.title.trim()
    if (title){
    const camp = await Campground.findOne({title})
    res.redirect(`/campgrounds/${camp._id}`)
    }else{
        req.flash('error', 'enter field to search')
        return res.redirect('/campgrounds')
    }
    
}