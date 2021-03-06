const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Poll = require('./lib/poll');
const _ = require('lodash');
const moment = require('moment');

app.locals.title = 'Votestance';
app.polls = {};

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index');
});

app.post('/polls', (request, response) => {
  var poll = new Poll(request.body.poll);
  app.polls[poll.id] = poll;
  app.polls[poll.votePageId] = poll;
  response.redirect('/polls/' + poll.id);
});

app.get('/polls/:id', (request, response) => {
  var poll = app.polls[request.params.id];

  response.render('poll', { pollData: poll });
});

app.get('/vote/:votePageId', (request, response) => {
  var poll = app.polls[request.params.votePageId];

  response.render('vote', { pollData: poll });
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

  socket.on('message', (channel, data) => {
    if (channel === 'voteCast') {
      var poll = app.polls[data.poll];
      poll.saveResponse(data);
      io.sockets.emit('voteCount', { pollData: poll });
    }
  });

  socket.on('message', (channel, data) => {
    if (channel === 'userVoted') {
      socket.emit('userVote', data);
    }
  });

  socket.on('message', (channel, data) => {
    if (channel === 'closePoll') {
      var poll = app.polls[data.poll];
      poll.open = data.response;
      io.sockets.emit('pollClosed', { pollData: poll });
    }
  });

});

module.exports = app;
