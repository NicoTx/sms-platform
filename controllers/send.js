'use strict'

const rp = require('request-promise')

module.exports = send

async function send (ctx) {
  // recupere les parametres envoyes par le client
  const message = ctx.request.body.message
  const numbers = ctx.request.body.numbers
  // verifie le message
  if (!message.length > 0) {
    ctx.body = 'Aucun message'
    return
  }
  const numbersCollection = numbers.split('\n')
  // verifie les numeros
  if (!numbers.length > 0 || !numbersCollection.length > 0) {
    ctx.body = 'Aucun numero'
    return
  }
  // prepare la requete
  const options = {
    method: 'POST',
    uri: 'https://api.clxcommunications.com/xms/v1/' + process.env.API_ID + '/batches',
    body: {
      'from': 'SMSPlatform',
      'to': numbersCollection,
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
    // enregistre la liste des numeros et le message en bdd
    for (let number of numbersCollection) {
      await ctx.connection.execute('INSERT INTO SMS (numero, texte, date) VALUES (?, ?, NOW())', [number, message])
    }
    const pluriel = numbersCollection.length > 1 ? 's' : ''
    ctx.body = `Votre message a bien été envoyé à ${numbersCollection.length} destinataire${pluriel}.`
  } catch (e) {
    console.error(e)
    ctx.body = 'Une erreur est survenue, merci d\'essayer à nouveau.'
  }
}
