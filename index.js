const koa = require('koa2');
//const app = new koa;
const parser = require('koa-bodyparser')();
const router = require('./router')
//const cors = require('koa2-cors')
//const message = require('./message')
//const redis = require('./redis')
//let config = require('../server.config')
//const path = require('path')
//解析 npm run 传人的参数
var minimist = require('minimist');
const token = require('./middleware/token')
class Server {
	constructor(){
		
//		console.log(path.relative(config.root, __dirname))
		this.app = new koa;

		this.app.use(parser);
//		this.app.use(token)

		this.init()
	}
	init (){
		//路由挂载
		router(this.app)
		//实例化消息类
//		global.redis = redis
//		new message()
		//挂载redis至全局变量
	}
	start() {
		let port = minimist(process.argv.slice(2)).PORT  || 3000;
		this.app.listen(port, () => {
			console.log(`Server run in ${port}`)
		})
	}
//	use(fn){
//		this.app.use(fn)
//	}
	
}






let app = new Server;

app.start();

