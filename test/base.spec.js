import test from 'ava'
import got from 'got'
import hexID from '@tadashi/hex-id'
import toPort from 'hash-to-port'
import base from '../src/base.js'

function _base(opts, ignore) {
	const port = toPort(hexID())
	const baseUrl = `http://127.0.0.1:${port}`

	const koa = Array.isArray(ignore) ? base(opts, ignore) : base(opts)
	koa.use(ctx => {
		ctx.body = {
			ok: true,
		}
	})

	const server = koa.listen(port)
	return {baseUrl, server}
}

test('com opts', async t => {
	const {baseUrl, server} = _base({error: true})
	const res = await got.get(`${baseUrl}`)

	t.is(res.statusCode, 200)
	t.snapshot(JSON.parse(res.body))

	// server.close.bind(server)()
	server.close()
})

test('sem opts', async t => {
	const {baseUrl, server} = _base()
	const res = await got.get(`${baseUrl}`)

	t.is(res.statusCode, 200)
	t.snapshot(JSON.parse(res.rawBody))

	// server.close.bind(server)()
	server.close()
})

test('com ignore', async t => {
	const {baseUrl, server} = _base({}, ['compress'])
	const res = await got.get(`${baseUrl}`)

	t.is(res.statusCode, 200)
	t.snapshot(JSON.parse(res.rawBody))

	// server.close.bind(server)()
	server.close()
})
