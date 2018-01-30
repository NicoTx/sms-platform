'use strict'

module.exports = send

function send (ctx) {
  const message = ctx.request.body.message
  const numbers = ctx.request.body.numbers
  // @TODO envoyer un sms avec le contenu "message" au numero dans "numbers"
  // @TODO (plus tard) envoyer a plusieurs numeros
  console.log(message, numbers)
  ctx.body = 'OK'
}
