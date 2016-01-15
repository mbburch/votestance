socket.on('voteCount', (data) => {
  var rows = document.getElementsByClassName('vote-count');
  console.log(data, data.pollData.responseVotes);
  for (i = 0; i < rows.length; i++) {
    var votes = data.pollData.responseVotes[rows[i].dataset.response];
    rows[i].innerText = votes;
  }
});

var closePoll = document.getElementById('close-poll');
var pollId = document.getElementById('poll-id').innerText;

closePoll.addEventListener('click', function () {
  console.log(pollId);
  socket.send('closePoll', { poll: pollId, response: false });
});

socket.on('pollClosed', (data) => {
  closePoll.disabled = true;
  document.getElementById('closed-msg').hidden = false;
});

