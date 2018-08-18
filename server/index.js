const Koa = require('koa')
const router = require('koa-router')()
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const path = require('path')

require('app-module-path').addPath(path.join(__dirname, '../'));

async function start() {
	const app = new Koa()
	const host = process.env.HOST || '0.0.0.0'
	const port = process.env.PORT || 35003

	if (process.env.NODE_ENV !== 'production') {
		require('./build.js')()
	}

	function uncaughtExceptionHandler(err) {
		if (err && err.code == 'ECONNREFUSED') {
			//do someting
		} else {
			process.exit(1)
		}
	}

	process.on('uncaughtException', uncaughtExceptionHandler);

	const routers = require('../router/index.js')

	app.on('error', (err, ctx) => {
		ctx.status = 500
		console.log(`server error: ${ctx.status}`)
	});

	app.use(async (ctx, next) => {
		const start = Date.now();
		const ip = ctx.req.headers['x-forwarded-for'] ||
			ctx.req.connection.remoteAddress ||
			ctx.req.socket.remoteAddress ||
			ctx.req.connection.socket.remoteAddress
		console.log(`[request] ${ctx.method} ${ctx.originalUrl} from ${ip}`)
		await next()
		const ms = Date.now() - start;
		console.log(`[response] ${ctx.method} ${ctx.originalUrl} from ${ip} [body] ${ctx.body} [httpCode]${ctx.status} - ${ms}ms`)
	})

	app.use(bodyParser())

	app.use(routers(router))

	// 404 hander
	app.use(async (ctx, next) => {
		console.log(`server error: ${ctx.status}`)
	})

	app.listen(port, host)
	console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()