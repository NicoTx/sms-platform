'use strict'

module.exports = start

async function start (ctx) {
  await ctx.render('index', {
    page: 'index'
  })
}
