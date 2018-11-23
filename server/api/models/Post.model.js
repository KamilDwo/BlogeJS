const mongoose = require('mongoose')
let PostElement

let postSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    }
})

PostElement = module.exports = mongoose.model('contact', postSchema)
module.exports.get = function (callback, limit) {
    PostElement.find(callback).limit(limit)
}
