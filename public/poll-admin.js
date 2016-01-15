socket.on('voteCount', (data) => {
  var rows = document.getElementsByClassName('vote-count');
  console.log(data, data.pollData.responseVotes);
  for (i = 0; i < rows.length; i++) {
    var votes = data.pollData.responseVotes[rows[i].dataset.response];
    rows[i].innerText = votes;
  }
});