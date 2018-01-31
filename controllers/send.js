'use strict'

const rp = require('request-promise')

module.exports = send

async function send (ctx) {
  // recupere les parametres envoyes par le client
  const message = ctx.request.body.message
  const numbers = ctx.request.body.numbers
  // @TODO envoyer a plusieurs numeros simultanement
  // prepare la requete
  const options = {
    method: 'POST',
    uri: 'https://api.clxcommunications.com/xms/v1/' + process.env.API_ID + '/batches',
    body: {
      'from': 'SMSPlatform',
      'to': [numbers],
      'body': message
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.API_KEY
    },
    json: true
  }
  try {
    // envoi la requete a l'API SMS
    await rp(options)
  } catch (e) {
    console.error(e)
  }
  ctx.body = 'OK'
}
