'use strict'

module.exports = history

async function history (ctx) {
  const [results] = await ctx.connection.execute('SELECT id, numero, texte FROM SMS')
  await ctx.render('history', {
    results
  })
}
