let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');


// create the User model instance
let userModel = require('../models/user');
let User = userModel.User;  

module.exports.displayHomePage = (req, res, next) => {
  res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
  res.render('index', {title: 'About me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
  res.render('index', {title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
  res.render('index', {title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
  res.render('index', {title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
  // check if user is already logged in
  if(!req.user){
    res.render('auth/login', {
      title: "Login",
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName: ''
    }) 
  } else {
    return res.redirect('/');
  }
}

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      // server error?
      if(err){
        return next(err);
      } 
      // is there a user login error?
      if(!user){
        req.flash('loginMessage', 'Authentication Error');
        return res.redirect('/login');
      }
      req.login(user, (err) => {
        // server error?
        if(err){
          return next(err);
        }

        const payload = {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email
        }

        const authToken = jwt.sign(payload, DB.Secret, {
          expiresIn: 604800 // 1 week
        });
        
        /* TODO - Getting ready to convert to API
        res.json({success: true, msg: 'User Logged in Successfully!', user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email
        }, token: authToken});
        */
        
        return res.redirect('/contact-list');
      });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
  // check if user is not already logged in
  if(!req.user){
    res.render('auth/register', {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    });
  } else {
    return res.redirect('/');
  }
}

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    // password goes here
    email: req.body.email,
    displayName: req.body.displayName
  });
  User.register(newUser, req.body.password, (err) => {
    if(err){
      console.log("Error: Inserting new user");
      if(err.name == "UserExistsError"){
        req.flash(
          'registerMessage',
          'Registration Error: User Already Exists'
        );
        console.log('Error: User Already Exists')
      }
      return res.render('auth/register', {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
      });      
    } else {
        // if no error exits, then registration is successful
        // redirect the user and authenticate

        /* TODO - Getting ready to convert to API
        res.json({success: true, msg: 'User Registered Successfully!'});
        */

        return passport.authenticate('local')(req, res, () => {
          res.redirect('/contact-list')
        });
      }
  });
}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}