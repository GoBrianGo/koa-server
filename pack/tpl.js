`${data.map((item) => `
var ${item} = require('../model/${item.replace(/_/g, '/')}')`).join('')
}
module.exports = (router) => {
${data.map((item) => `
	router.get('/${item.replace(/_/g, '/')}', async (ctx) => {
		await ${item}(ctx)
	})
`).join('')
}
	return router.routes()
}`