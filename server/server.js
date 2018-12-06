const conf = 'mongodb://blogejs:blogejs123@ds251332.mlab.com:51332/blogejs'
const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Blog = require('./models/Blog')
const User = require('./models/Password')
const blogRoutes = require('./routes/blog')
const userRoutes = require('./routes/user')

mongoose.Promise = global.Promise
mongoose.connect(conf)
  .then(() => console.log('Connection succesful'))
  .catch((err) => console.error(err))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(require('express-session')({
  secret: 'Rusty is the best og in the world',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/post', blogRoutes)

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})