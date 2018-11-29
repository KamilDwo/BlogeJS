const conf = 'mongodb://blogejs:blogejs123@ds251332.mlab.com:51332/blogejs'
const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const Blog = require('./models/Blog.js')
const blogRoutes = require('./routes/blog')

mongoose.Promise = global.Promise
mongoose.connect(conf)
.then(() =>  console.log('Connection succesful'))
.catch((err) => console.error(err))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/post', blogRoutes)

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
