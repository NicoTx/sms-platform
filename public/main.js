/* global $, alert */
$(document).ready(function () {
  $('#button').click(function () {
    $.post('/send', { message: $('#message').val(), numbers: $('#numbers').val() }, function (data) {
      alert(data)
    })
  })
})
