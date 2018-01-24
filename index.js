'use strict'

require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-ejs')
const serve = require('koa-static')
const path = require('path')
const rp = require('request-promise')
const controller = require('./controllers')

async function startServer () {
  // serveur
  const app = new Koa()
  const router = new Router()
  // moteur de template
  render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    // @TODO utiliser le cache en production
    cache: false
  })
  // route principale
  router.get('/', controller.start)
  // demarrage du serveur
  app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.SERVER_PORT)
}

startServer()
