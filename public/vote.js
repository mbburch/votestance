$(".private-true").hide();

var buttons = document.querySelectorAll('#poll-responses button');
var pollId = document.getElementById('poll-id').innerText;

for (var i = 0; i < buttons.length; i++) {
  var self = buttons[i];
  self.addEventListener('click', () => {
    var vote = self.innerText.toLowerCase();
    socket.send('voteCast', { poll: pollId, response: vote });
  });
}
