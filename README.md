# Koa App Base

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[![XO code style][xo-img]][xo]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/koa-base.svg
[npm]:             https://www.npmjs.com/package/@tadashi/koa-base
[ci-img]:          https://github.com/lagden/koa-app-base/workflows/Koa%20Base%20CI/badge.svg
[ci]:              https://github.com/lagden/koa-app-base/actions?query=workflow%3A%22Koa+Base+CI%22
[coveralls-img]:   https://coveralls.io/repos/github/lagden/koa-app-base/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/koa-app-base?branch=master
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo


Basic setup with [Koa](https://github.com/koajs/koa)

## Install

```
$ npm i -S @tadashi/koa-base
```

## Middleware

Middleware list pre installed

- [@tadashi/koa-error](https://github.com/lagden/koa-error)
- [@koa/cors](https://github.com/koajs/cors)
- [koa-compress](https://github.com/koajs/compress)
- [koa-conditional-get](https://github.com/koajs/conditional-get)
- [koa-etag](https://github.com/koajs/etag)


## Usage

```js
const app = require('@tadashi/koa-base')

const options = {
  error: true
}

const ignore = ['cors']

app(options, ignore)
  .use(ctx => {
    ctx.throw(401)
  })
  .on('error', err => {
    console.log(err.message) // Unauthorized
  })
```

## API

createApp( [opts] [, ignore ])

Name   | Type   | Default    | Description
------ | ------ | ---------- | ------------
opts   | object | See bellow | Middleware options
ignore | array  | []         | Ignored middleware


### opts

#### Default

```json
{
  "error": false,
  "compress": {},
  "cors": {}
}
```

---

See the options in the middleware itself

Parameter    | Middleware
-----------  | --------------------
error        | [@tadashi/koa-error](https://github.com/lagden/koa-error)
compress     | [koa-compress](https://github.com/koajs/compress)
cors         | [kcors](https://github.com/koajs/cors)


## License

MIT © [Thiago Lagden](https://github.com/lagden)
