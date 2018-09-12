const path = require('path')

const Koa = require('koa')
const app = new Koa();
const views = require('koa-views')

app.use(views(path.join(__dirname, './views'), {
	extension: 'pug'
}))

app.use(async (ctx, next) => {
	await ctx.render('index', {
		you: 'lt',
		me: 'lqzh'
	})
})

app.listen(3000)
console.log('3000', )
