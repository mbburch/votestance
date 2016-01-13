const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');
const _ = require('lodash');

app.locals.title = 'Votestance';
app.locals.polls = {};

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index');
});

app.post('/polls', (request, response) => {
  var id = generateId();

  app.locals.polls[id] = request.body.poll;

  response.redirect('/polls/' + id);
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll });
});

var port = process.env.PORT || 3000;

var server = http.createServer(app);

if(!module.parent) {
  server.listen(port, () => {
   console.log(`${app.locals.title} is running on port ${port}.`);
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

module.exports = app;
