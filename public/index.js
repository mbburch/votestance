$('#add-response').on('click', (e) => {
  e.preventDefault();
  var newResponse = $(`<input required type="text" name="poll[responses][]" placeholder="Response">`);
  $('#responses').append(newResponse);
});