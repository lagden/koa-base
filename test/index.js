'use strict'

const test = require('ava')
const request = require('supertest')
const toPort = require('hash-to-port')
const base = require('..')

function _base(opts) {
	const koa = base(opts)
		.use(ctx => {
			ctx.body = {
				ok: true
			}
		})

	const hash = (Number(String(Math.random()).split('.')[1]) + Date.now()).toString(26)
	const app = request.agent(koa.listen(toPort(hash)))
	return app
}

test('com opts', async t => {
	const app = _base({error: true})
	const res = await app.get('/')
	const {ok} = res.body

	t.is(res.status, 200)
	t.true(ok)
})

test('sem opts', async t => {
	const app = _base()
	const res = await app.get('/')
	const {ok} = res.body

	t.is(res.status, 200)
	t.true(ok)
})
