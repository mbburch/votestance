$('#add-response').on('click', (e) => {
  e.preventDefault();
  var newResponse = $(`<input type="response" name="poll[responses][]" placeholder="Response">`);
  $('#responses').append(newResponse);
});
