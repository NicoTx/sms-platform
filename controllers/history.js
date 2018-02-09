'use strict'

module.exports = history

async function history (ctx) {
  const [results] = await ctx.connection.execute('SELECT id, numero, texte, date FROM SMS ORDER BY id DESC')
  await ctx.render('history', {
    results
  })
}
