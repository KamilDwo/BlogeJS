const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3005
const router = express.Router()

let dbUrl = 'mongodb://admin:admin123@ds245512.mlab.com:45512/heartit';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

const articleSchema = new mongoose.Schema({
title: String,
articleText: String,
fullName: String
});

const Article = mongoose.model('Article', articleSchema);

app.use(express.static('public'));


app.post('/addArticle', (req, res) => {
const myData = new Article(req.body);
myData.save()

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log('Example app listening on port !'+port))
