$(".private-true").hide();

var buttons = document.querySelectorAll('#poll-responses button');
var pollId = document.getElementById('poll-id').innerText;

$(document).ready(function () {
  $('.poll-vote').on('click', function () {
    var vote = $(this).text();
    sendVote(vote);
  });
});

function sendVote(vote) {
  socket.send('voteCast', { poll: pollId, response: vote, voter: socket.id });
  socket.send('userVoted', vote);
}

socket.on('voteCount', (data) => {
  var rows = document.getElementsByClassName('vote-count');
  for (i = 0; i < rows.length; i++) {
    var votes = data.pollData.responseVotes[rows[i].dataset.response];
    rows[i].innerText = votes;
  }
});

var userVote = document.getElementById('user-vote');
var closedMessage = document.getElementById('closed-msg');
var openStatus = closedMessage.dataset.status;

socket.on('userVote', (vote) => {
  if (openStatus == 'true') {
    userVote.innerHTML = "<div class='row'<div class='col s6 offset-3'>"
    + "<div class='card-panel grey darken-1'>"
    + "<span class='white-text'>You voted for "
    + vote + ".</span</div></div></div>";
  } else {
    userVote.innerHTML = "<div class='row'<div class='col s6 offset-3'>"
    + "<div class='card-panel grey darken-1'>"
    + "<span class='white-text'>Sorry. The poll has closed.</span</div></div></div>";
    $("button").attr("disabled", true);
  }
});

socket.on('pollClosed', (data) => {
  document.getElementById('closed-msg').hidden = false;
  $("button").attr("disabled", true);
});
