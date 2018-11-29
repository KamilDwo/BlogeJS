const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Blog = require('../models/Blog.js')

router.get('/', function(req, res, next) {
  Blog.find(function (err, posts) {
    if (err) return next(err)
    res.json(posts)
  })
})

/* GET SINGLE BY ID */
router.get('/:id', function(req, res, next) {
  Blog.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* SAVE */
router.post('/', function(req, res, next) {
  Blog.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* UPDATE */
router.put('/:id', function(req, res, next) {
  Blog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE */
router.delete('/:id', function(req, res, next) {
  Blog.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router;
