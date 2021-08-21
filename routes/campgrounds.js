const express = require('express')
const router = express.Router()
const {campValidator} = require('../schemaValidator/joiValidation')
const wrapAsync = require('../utils/wrapAsync')
const Campground = require('../models/campground')
const {isLoggedIn,isAuthorized,editFormPath} = require('../middleware')
const campgrounds = require('../controller/campgroundController')
const multer = require('multer')
const {cloudinary,storage} = require('../cloudinary/index')
var upload = multer({ storage })



router.route('/')
    .get( campgrounds.index )
    .post(isLoggedIn,upload.array('image'),campValidator, wrapAsync(campgrounds.createCamp))

router.route('/search')
    .post(campgrounds.searchCamp)
    


router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(wrapAsync(campgrounds.showCamp))
    .put(isLoggedIn,isAuthorized,upload.array('image'), campValidator, wrapAsync(campgrounds.editCamp))
   
    .delete(isLoggedIn,isAuthorized, campgrounds.deleteCamp)





router.get('/:id/edit',isLoggedIn,isAuthorized,editFormPath, campgrounds.renderEditForm)


module.exports = router
