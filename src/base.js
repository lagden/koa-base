import Koa from 'koa'
import compress from 'koa-compress'
import cors from '@koa/cors'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import error from '@tadashi/koa-error'

const middleware = {
	error,
	cors,
	compress,
	conditional,
	etag,
}

const config = {
	error: false,
	compress: {},
	cors: {},
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

export default createApp
