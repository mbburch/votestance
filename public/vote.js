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

socket.on('userVote', (vote) => {
  userVote.innerHTML = "<div class='row'<div class='col s6 offset-3'>"
  + "<div class='card-panel grey darken-1'>"
  + "<span class='white-text'>You voted for "
  + vote + ".</span</div></div></div>";
});

socket.on('pollClosed', (data) => {
  document.getElementById('closed-msg').hidden = false;
  $("button").attr("disabled", true);
});
