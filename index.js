'use strict'

const zlib = require('zlib')
const merge = require('lodash.merge')
const compress = require('koa-compress')
const Koa = require('koa')
const koaCors = require('kcors')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const helmet = require('koa-helmet')
const errorHandler = require('@tadashi/koa-error')

// Middleware options
const _opts = Object.create(null)

_opts.errorHandler = {emit: false}
_opts.compress = {
	filter: contentType => /text|xml|json|javascript/ig.test(contentType),
	threshold: 2048,
	flush: zlib.Z_SYNC_FLUSH
}
_opts.helmet = {noCache: true}
_opts.koaCors = {}

function createApp(opts = {}) {
	const options = merge(_opts, opts)
	const app = new Koa()
	app
		.use(errorHandler(options.errorHandler.emit))
		.use(compress(options.compress))
		.use(helmet(options.helmet))
		.use(koaCors(options.koaCors))
		.use(conditional())
		.use(etag())

	return app
}

module.exports = createApp
