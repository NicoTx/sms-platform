/* global $, alert */
$(document).ready(function () {
  $('#button').click(function () {
    $.post('/send', { message: $('#message').val() }, function (data) {
      alert(data)
    })
  })
})
