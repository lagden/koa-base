'use strict'

const merge = require('lodash.merge')
const Koa = require('koa')
const compress = require('koa-compress')
const cors = require('kcors')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const errorHandling = require('@tadashi/koa-error')

const _opts = Object.create(null)
_opts.error = false
_opts.compress = {}
_opts.cors = {}

function createApp(opts = {}) {
	const options = merge(_opts, opts)
	const app = new Koa()
	app
		.use(errorHandling(options.error))
		.use(cors(options.cors))
		.use(compress(options.compress))
		.use(conditional())
		.use(etag())

	return app
}

module.exports = createApp
