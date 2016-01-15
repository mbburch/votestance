$(".private-true").hide();

var buttons = document.querySelectorAll('#poll-responses button');
var pollId = document.getElementById('poll-id').innerText;

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var vote = this.innerText.toLowerCase();
    socket.send('voteCast', { poll: pollId, response: vote });
    socket.send('userVoted', vote);
  });
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
  + "<span class='white-text'>You just cast your vote for: <strong>"
  + vote
  + "</strong>.</span</div></div></div>";
});
