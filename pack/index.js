var fs = require('fs')
var path = require('path')

var pathJson = {} //存放目录路径
var routeArr = [] //存放路由数组
var cache = [] //缓存数组

// 读取model文件夹目录生成对应层级json
var getPathJson = (obj, _path) => {
	var pa = fs.readdirSync(_path)

	pa.forEach((item) => {
		if (item[0] !== '.') {
			routersPath = path.join(_path + '/' + item)
			try {
				var stat = fs.statSync(routersPath)
				if (stat.isDirectory()) {
					obj[item] = {}
					getPathJson(obj[item], routersPath)
				} else {
					// path.basename(path.dirname(routersPath))
					obj[item] = ''
				}
			} catch (e) {
				console.log(e)
			}
			// pathJson[item] = {}
		}
	})
}

//把目录json转换成数组
var mapJson = (json, _cache, _isLast) => {
	var count = 0
	var length = Object.keys(json).length
	var isLast = false
	var prev = ''

	for (let key in json) {

		++count

		if (key === 'test5.js') {
			console.log('test5.js: ' + prev)
			console.log(_cache)
		}
		if (count > 1 && prev === 'object') {
			_cache.pop()
		}

		if (count === length) {
			isLast = true
		}

		if (typeof json[key] === 'object') {
			_cache.push(key)
			mapJson(json[key], _cache, isLast)
		} else {
			_cache.push(key)
			routeArr.push(_cache.join('_').replace('.js', ''))
			_cache.pop()
			if (_isLast && isLast) {
				_cache.pop()
			}
		}

		prev = typeof json[key]
	}
}

//把数据写入模版文件
var tpl = (file, data) => {
	var tpl = fs.readFileSync(file, 'utf-8')
	let func = new Function('data', 'return ' + tpl)
	return func(data)
}

//写入路由文件
var writeFile = (output) => {
	var str = tpl('./pack/tpl.js', routeArr).trim()

	try {
		fs.writeFileSync(output, str, 'utf-8')
	} catch (e) {
		console.log(e)
	}
}

module.exports = (option) => {
	getPathJson(pathJson, option.routePath)
	mapJson(pathJson, cache, true)
	writeFile(option.output)
	console.log('generate success')
}