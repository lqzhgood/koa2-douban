const Koa = require('koa')
const app = new Koa();
const ejs = require('ejs')

const { htmlTpl, ejsTpl } = require('./tpl/index.js')

app.use(async (ctx, next) => {
	ctx.type = "text/html; charset=utf-8"
	ctx.body = ejs.render(ejsTpl, {
		you: 'lqzh',
		me: 'gaga'
	})
})

app.listen(3000)
