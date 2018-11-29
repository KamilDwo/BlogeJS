const mongoose = require('mongoose')

let BlogSchema = new mongoose.Schema({
  postTitle: String,
  postIntro: String,
  postContent: String,
  postCreated: Date,
  postUser: Number
})

module.exports = mongoose.model('Blog', BlogSchema, 'posts')