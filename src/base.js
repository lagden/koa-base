import Koa from 'koa'
import compress from 'koa-compress'
import cors from '@koa/cors'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import error from '@tadashi/koa-error'

/**
 * Middleware object containing middleware functions.
 *
 * @property {Function} error - Error-handling middleware.
 * @property {Function} cors - Cross-origin resource sharing middleware.
 * @property {Function} compress - Response compression middleware.
 * @property {Function} conditional - Conditional GET middleware.
 * @property {Function} etag - ETag generation middleware.
 */
const middleware = {
	error,
	cors,
	compress,
	conditional,
	etag,
}

/**
 * Creates a Koa application with specified middleware and options.
 *
 * @param {Object} opts - Options for middleware configuration.
 * @param {Object} ignore - Middleware to ignore when creating the app.
 * @returns {Object} - A Koa application instance.
 */
function createApp(opts = {}, ignore = []) {
	// Default configuration for middleware options.
	const config = {
		error: false,
		compress: {},
		cors: {},
	}

	// Merge the default configuration with the provided options.
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
