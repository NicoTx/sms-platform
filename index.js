'use strict'

const Koa = require('koa')
const dotenv = require('dotenv').config()
const path = require('path')
const Router = require('koa-router')
const rp = require('request-promise')
const render = require('koa-ejs')
const serve = require('koa-static')
const controller = require('./controllers')

async function startServer() {
    const app = new Koa()
    const router = new Router()

    render(app, {
        root: path.join(__dirname, 'views'),
        layout: false,
        viewExt: 'html',
        cache: false,
        debug: true
      })
      
    router.get('/', controller.start)

    app
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(process.env.SERVER_PORT)
}

startServer()