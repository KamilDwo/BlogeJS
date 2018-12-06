const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/Password')
const passport = require('passport')

router.get('/secret', isLoggedIn, function(req, res) {
  res.render('secret')
})

router.get('/register', function(req, res) {
  res.render('register')
})

router.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/secret');
    })
  })
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function(req, res) {
  res.send('User is ' + req.user.id)
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

module.exports = router