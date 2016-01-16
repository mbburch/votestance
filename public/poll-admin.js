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
  socket.send('closePoll', { poll: pollId, response: false });
});

$(document).ready(function () {
  var timeCheck = document.getElementById('end-time');
  var checkForEnd = timeCheck.dataset.time;
  if (checkForEnd) {
    timeDifference(checkForEnd);
  } else {
  }
});

function timeDifference(checkForEnd) {
  if (Date.parse(checkForEnd) >= Date.now()) {
    socket.send('closePoll', { poll: pollId, response: false });
  }
}

socket.on('pollClosed', (data) => {
  closePoll.disabled = true;
  document.getElementById('closed-msg').hidden = false;
  document.getElementById('end-time').hidden = true;
});