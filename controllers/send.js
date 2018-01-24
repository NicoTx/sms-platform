'use strict'

module.exports = send

function send (ctx) {
  ctx.body = ctx.request.body
}
