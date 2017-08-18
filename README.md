# Koa App Base

[![XO code style][xo-img]][xo]


[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo

Setup base para fazer um web server utilizando [Koa](https://github.com/koajs/koa)

## Install

```
$ npm i -S koa-app-base
```


## Usage

```js
const app = require('koa-app-base')

const options = {
  errorHandler: {
    emit: true
  }
}

app(options)
  .use(ctx => {
    ctx.throw(401)
  })
  .on('error', err => {
    console.log(err.message) // Unauthorized
  })
```


## Options

Veja as opções no próprio pacote

Parameter    | Package
-----------  | --------------------
errorHandler | [@tadashi/koa-error](https://github.com/lagden/koa-error)
compress     | [koa-compress](https://github.com/koajs/compress)
helmet       | [koa-helmet](https://github.com/venables/koa-helmet)
koaCors      | [kcors](https://github.com/koajs/cors)


## License

MIT © [Thiago Lagden](http://lagden.in)
