const express = require('express')
const router = express.Router()
const User = require('../models/users')
const passport = require('passport')
const users = require('../controller/userControllerr')

const emailValidation = async (req,res,next)=>{
        const {email} = req.body
        const isEmail = await User.findOne({email})
        if(!isEmail){
            next()
        }else{
            req.flash('error',"this email is already exists")
            res.redirect('/register')
        }
}

router.route('/register')
    .get( users.renderRegisterForm)
    .post( emailValidation, users.registerUser)
  

router.route('/login')
    .get( users.renderLoginPage)
    .post(passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}),users.loginUser)


router.get('/logout',users.logoutUser)

module.exports = router