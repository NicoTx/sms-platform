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

    router.get('/', controller.start)

    app
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(SERVER_PORT)
}

startServer()