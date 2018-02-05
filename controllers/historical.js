'use strict'

module.exports = historical

async function historical (ctx) {
  const [results] = await ctx.connection.execute('SELECT id, numero, texte FROM SMS')
  ctx.body = results
}
