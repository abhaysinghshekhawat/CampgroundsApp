const User = require('../models/users')

module.exports.renderRegisterForm = (req,res)=>{
    res.render('users/signup')
}

module.exports.registerUser = async (req,res)=>{
    try{
    const {email , username, password} = req.body
    const user = new User({email,username})
    const newUser =  await User.register(user,password)
    req.login(newUser,err=>{
        if(err) return next(err)
        req.flash('success', "welcome to the campground")
        res.redirect('/campgrounds')

    })
    
    }catch(err){
        //res.send(err)
        req.flash('error',err.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginPage = (req,res)=>{

    res.render('users/login')
}

module.exports.loginUser = (req,res)=>{
    req.flash('success', 'welcome back!!')
    const returnPath =  (req.session.returnTo)?req.session.returnTo:'/campgrounds'
    res.redirect(returnPath)
}

module.exports.logoutUser =  (req,res)=>{
    req.logout()
    req.flash('success','succesfully logged out')
    res.redirect('/')
}