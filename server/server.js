const conf = 'mongodb://blogejs:blogejs123@ds251332.mlab.com:51332/blogejs'

let express = require('express')
let app = express()
let port = 3002
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

let nameSchema = new mongoose.Schema({
  firstName: String,
  lastNameName: String
})

mongoose.Promise = global.Promise
mongoose.connect(conf)

let User = mongoose.model('User', nameSchema)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(500).send()
})

app.post('/addname', (req, res) => {
  let myData = new User(req.body)

  myData.save().then(item => {
    res.send({ RESPONSE: 'SUCCESS' })
  }).catch(err => {
    res.status(400).send({ RESPONSE: 'ERROR' })
  })
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
