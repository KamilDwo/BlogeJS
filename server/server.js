const express = require('express')
const app = express()
const port = 3003
const cors = require('cors')

app.use(cors())
app.use(express.static('server/api'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 8080
const router = express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/myproject')

var Bear = require('./api/models/bear');



app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  })
})

router.route('/bears').post(function(req, res) {

  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Bear created!'
    });
  });

});

app.use(cors())
app.use('/api', router)
app.listen(port)
console.log('Magic happens on port ' + port)
*/