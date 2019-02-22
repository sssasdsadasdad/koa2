const r = require('redis')
const {redis} = require('../config')
class Redis{
	constructor(){
		this.redis = r.createClient(redis);
	}
	get(key, fn){
		this.redis.get(key, (err, v) => {
			fn(err, v)
		})
	}
	set(k, v){
		this.redis.set(k, v)
	}
	del(k){
		this.redis.del(k)
	}

}

module.exports = new Redis()
