'use strict'

import test from 'ava'
import request from 'supertest'
import toPort from 'hash-to-port'
import base from '../.'

const koa = base()
	.use(ctx => {
		ctx.body = {
			ok: true
		}
	})

const hash = (Number(String(Math.random()).split('.')[1]) + Date.now()).toString(26)
const app = request.agent(koa.listen(toPort(hash)))

test('ok', async t => {
	const res = await app.get('/')
	const {ok} = res.body

	t.is(res.status, 200)
	t.true(ok)
})
