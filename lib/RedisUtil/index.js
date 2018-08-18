const config = process.env.NODE_ENV === 'production' ? require('./config').prod : require('./config').dev
const bluebird = require('bluebird')
// const redis = require('redis')
const Redis = require('ioredis')
const client = new Redis({
	sentinels: config.redis,
	name: config.masterName
})
// const client = new Redis(config.port, config.ip) 

// 把redis方法变成promise  client.get => client.getAsync
bluebird.promisifyAll(client)

client.on('error', (err) => {
	console.log('redis client connect error');
	console.log(err)
})

client.on('connect', () => {
	console.log('redis client connect')
})

client.on('end', (err) => {
	console.log('redis client end')
	console.log(err)
})

client.on('close', (err) => {
	console.log('redis client end')
	console.log(err)
})

client.on('reconnecting', (err) => {
	console.log('redis client reconnect')
	console.log(err)
})

module.exports = {
	client: client,
	pipeline() {
		return client.pipeline()
	},
	multi() {
		return client.multi()
	},
	exec() {
		try {
			return client.exec()
		}catch(e) {
			console.log(e)
			return ''
		}
	},
	//redis key api
	del(...params) {
		try {
			return client.delAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	exists(...params) {
		try {
			return client.existsAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	//seconds
	expire(...params) {
		try {
			return client.expireAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	type(...params) {
		try {
			return client.typeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis string api
	get(...params) {
		try {
			return client.getAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	set(...params) {
		try {
			return client.setAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	getrange(...params) {
		try {
			return client.getrangeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	getset(...params) {
		try {
			return client.getsetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	mget(...params) {
		try {
			return client.mgetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	mset(...params) {
		try {
			return client.msetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	msetnx(...params) {
		try {
			return client.msetnxAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	setex(...params) {
		try {
			return client.setexAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	setnx(...params) {
		try {
			return client.setnxAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	setrange(...params) {
		try {
			return client.setrangeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	strlen(...params) {
		try {
			return client.strlenAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	incr(...params) {
		try {
			return client.incrAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	incrby(...params) {
		try {
			client.incrbyAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	incrbyfloat(...params) {
		try {
			client.incrbyfloatAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	decr(...params) {
		try {
			return client.decrAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	decrby(...params) {
		try {
			return client.decrbyAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	append(...params) {
		try {
			return client.appendAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis hash api
	hget(...params) {
		try {
			return client.hgetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis hash api
	hgetall(...params) {
		try {
			return client.hgetallAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hset(...params) {
		try {
			return client.hsetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hmset(...params) {
		try {
			return client.hmsetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hmget(...params) {
		try {
			return client.hmgetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hsetnx(...params) {
		try {
			return client.hsetnxAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hvals(...params) {
		try {
			return client.hvalsAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hincrBy(...params) {
		try {
			return client.hincrByAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hexists(...params) {
		try {
			return client.hexistsAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hkeys(...params) {
		try {
			return client.hkeysAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	hlen(...params) {
		try {
			return client.hlenAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	blpop(...params) {
		try {
			return client.blpopAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	brpop(...params) {
		try {
			return client.brpopAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	brpoplpush(...params) {
		try {
			return client.brpoplpushAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis list api
	lindex(...params) {
		try {
			return client.lindexAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	llen(...params) {
		try {
			return client.llenAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	lpop(...params) {
		try {
			return client.lpopAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	lpush(...params) {
		try {
			return client.lpushAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	lpushx(...params) {
		try {
			return client.lpushxAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	lrange(...params) {
		try {
			return client.lrangeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	lrem(...params) {
		try {
			return client.lremAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	lset(...params) {
		try {
			return client.lsetAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	ltrim(...params) {
		try {
			return client.ltrimAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	rpop(...params) {
		try {
			return client.rpopAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	rpoplpush(...params) {
		try {
			return client.rpoplpushAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	rpush(...params) {
		try {
			return client.rpushAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	rpushx(...params) {
		try {
			return client.rpushxAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis set api
	sadd(...params) {
		try {
			return client.saddAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	scard(...params) {
		try {
			return client.scardAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sdiff(...params) {
		try {
			return client.sdiffAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sdiffstore(...params) {
		try {
			return client.sdiffstoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sinter(...params) {
		try {
			return client.sinterAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sinterstore(...params) {
		try {
			return client.sinterstoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sismember(...params) {
		try {
			return client.sismemberAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	smembers(...params) {
		try {
			return client.smembersAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	smove(...params) {
		try {
			return client.smoveAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	spop(...params) {
		try {
			return client.spopAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	srandmember(...params) {
		try {
			return client.srandmemberAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	srem(...params) {
		try {
			return client.sremAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sunion(...params) {
		try {
			return client.sunionAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sunion(...params) {
		try {
			return client.sunionAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	sunionstore(...params) {
		try {
			return client.sunionstoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis sorted set api
	zadd(...params) {
		try {
			return client.zaddAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zcard(...params) {
		try {
			return client.zcardAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zcount(...params) {
		try {
			return client.zcountAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zincrby(...params) {
		try {
			return client.zincrbyAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zinterstore(...params) {
		try {
			return client.zinterstoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zlexcount(...params) {
		try {
			return client.zlexcountAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrange(...params) {
		try {
			return client.zrangeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrangebylex(...params) {
		try {
			return client.zrangebylexAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrangebyscore(...params) {
		try {
			return client.zrangebyscoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrank(...params) {
		try {
			return client.zrankAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrem(...params) {
		try {
			return client.zremAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zremrangebyrank(...params) {
		try {
			return client.zremrangebyrankAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zremrangebyscore(...params) {
		try {
			return client.zremrangebyscoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrevrange(...params) {
		try {
			return client.zrevrangeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrevrangebyscore(...params) {
		try {
			return client.zrevrangebyscoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zrevrank(...params) {
		try {
			return client.zrevrankAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zscore(...params) {
		try {
			return client.zscoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	zunionstore(...params) {
		try {
			return client.zunionstoreAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	// redis HyperLogLog api
	pfadd(...params) {
		try {
			return client.pfaddAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	pfcount(...params) {
		try {
			return client.pfcountAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	},

	pgmerge(...params) {
		try {
			return client.pgmergeAsync(...params)
		} catch (e) {
			console.log(e)
			return ''
		}
	}
}