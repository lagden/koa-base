'use strict'

const Koa = require('koa')
const compress = require('koa-compress')
const cors = require('@koa/cors')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const error = require('@tadashi/koa-error')

const middleware = {
	error,
	cors,
	compress,
	conditional,
	etag
}

const config = {
	error: false,
	compress: {},
	cors: {}
}

function createApp(opts = {}, ignore = []) {
	const options = {...config, ...opts}
	const app = new Koa()
	for (const [k, fn] of Object.entries(middleware)) {
		if (ignore.includes(k) === false) {
			app.use(fn(options[k]))
		}
	}

	return app
}

module.exports = createApp
