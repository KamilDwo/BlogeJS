const conf = 'mongodb://blogejs:blogejs123@ds251332.mlab.com:51332/blogejs'

let express = require('express')
let app = express()
let port = 3002
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cors = require('cors')
let response

let nameSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String
})

mongoose.Promise = global.Promise
mongoose.connect(conf)

let User = mongoose.model('User', nameSchema, 'posts')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/post', (req, res) => {
  let myData = new User(req.body)

  myData.save().then(item => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).send()
  })
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
