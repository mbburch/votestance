$(".private-true").hide();

var buttons = document.querySelectorAll('#poll-responses button');
console.log(buttons);
console.log(buttons[0].innerText);

for (var i = 0; i < buttons.length; i++) {
  var self = buttons[i];
  self.addEventListener('click', () => {
    console.log(self.innerText);
    socket.send('voteCast', self.innerText);
  });
}
