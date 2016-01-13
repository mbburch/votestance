const http = require('http');
const express = require('express');
const app = express();
const _ = require('lodash');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
  res.render('index');
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)
                 .listen(port, function () {
                   console.log('Listening on port ' + port + '.');
                 });

module.exports = server;
