/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Zach Bishop
 * Email: bishopz@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var allData = {};
var postData = require('./postData');
allData["postData"]=postData;
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.get('/', function(req, res, next) {
  allData["singlePost"] = false;
  res.status(200).render('index', allData);
});

app.get('/posts/:n', function(req, res, next) {
  allData["singlePost"] = true;

  var n = req.params.n;
  allData["thePost"] = postData[n];

  res.status(200).render('index', allData)
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
