const mongoose = require('mongoose')

let BlogSchema = new mongoose.Schema({
  postTitle: String,
  postIntro: String,
  postContent: String,
  postCreate: {
    type: Date,
    default: Date.now
  },
  postUser: Number
})

module.exports = mongoose.model('Blog', BlogSchema, 'posts')