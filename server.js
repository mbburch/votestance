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
  server.listen(port, () => {
   console.log('Listening on port ' + port + '.');
  });
}

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

module.exports = server;
