// 提交代码前执行该文件生成路由文件
const path = require('path')
const pack = require('../pack')

const config = {
	routePath: path.join(__dirname, '../model'),
	output: path.join(__dirname, '../router/index.js')
}

if (process.env.NODE_ENV === 'production') {
	pack(config)

} else {
	module.exports = () => {
		pack(config)
	}
}