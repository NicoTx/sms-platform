/* global $ */
$(document).ready(function () {
  $('#button').click(function () {
    $.post('/send', { message: $('#message').val(), numbers: $('#numbers').val() }, function (data) {
      $('#alertSMSbody').text(data)
      $('#alertSMS').modal('show')
    })
  })
})
