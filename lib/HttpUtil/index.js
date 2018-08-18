const axios = require('axios')

var instance = axios.create({})

instance.interceptors.request.use(
	config => {
		console.log(config)
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

// http response 拦截器
instance.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		console.log('error')
		console.log(error.response)
		if (error.response) {
			// console.log(error.response)
		}
		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
		return Promise.reject(error.response.data)
	}
)

instance.commonGetRequest = async (url, params = {}) => {
	try {
		return await instance.get(url, {params: params})
	} catch (e) {
		return {
			code: '404'
		}
		console.log(e)
	}
}
module.exports = instance