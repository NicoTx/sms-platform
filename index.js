'use strict'

require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-ejs')
const serve = require('koa-static')
const bodyParser = require('koa-body')
const path = require('path')
const rp = require('request-promise')
const controller = require('./controllers')
const db = require('./db')

async function startServer () {
  // serveur
  const app = new Koa()
  const router = new Router()

  app.context.connection = await db.connection()
  // moteur de template
  render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    // @TODO utiliser le cache en production
    cache: false
  })
  // routes
  router.get('/', controller.start)
  router.post('/send', controller.send)
  // demarrage du serveur
  app
  .use(serve('public'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.SERVER_PORT)
}

startServer()
