let PostElement = require('../models/Post.model')
let postEl

exports.index = function (req, res) {
    PostElement.get(function (err, contacts) {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            })
        }
        res.json({
            status: 'success',
            message: 'Contacts retrieved successfully',
            data: contacts
        })
    })
}
