socket.on('voteCount', (data) => {
  var rows = document.getElementsByClassName('vote-count');
  for (i = 0; i < rows.length; i++) {
    var votes = data.pollData.responseVotes[rows[i].dataset.response];
    rows[i].innerText = votes;
  }
});

var closePoll = document.getElementById('close-poll');
var pollId = document.getElementById('poll-id').innerText;

$(document).ready(function () {
  var timeCheck = document.getElementById('end-time');
  var checkForEnd = timeCheck.dataset.time;

  if (checkForEnd != false) {
    timeDifference(checkForEnd);
  } else {
    timeCheck.hidden = true;
    closePoll.addEventListener('click', function () {
      socket.send('closePoll', { poll: pollId, response: false });
    });
  }
});

function timeDifference(checkForEnd) {
  var timeinterval = setInterval(function () {
    if(checkForEnd <= Date.now()){
      socket.send('closePoll', { poll: pollId, response: false });
      clearInterval(timeinterval);
    }
  },1000);
}

socket.on('pollClosed', (data) => {
  closePoll.disabled = true;
  document.getElementById('closed-msg').hidden = false;
  document.getElementById('end-time').hidden = true;
});
