const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res){
  res.render('index');
});

var port = process.env.PORT || 3000;

var server = http.createServer(app);

if(!module.parent) {
  server.listen(port, function () {
   console.log('Listening on port ' + port + '.');
  });
}

module.exports = server;
