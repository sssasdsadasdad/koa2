const io = require('socket.io')();
const redis = require('../redis');
 class Message {
	constructor(port = 3001){

		this.client = io
		this.client.listen(3001)
		this.MessageList()
	}
	//消息处理
	MessageList(){
		//websocket链接成功时
		this.client.on('connection', client => {
			//client_id绑定uid
			client.on('send_uid', v => {
				//uid => client_id存储与redis
				redis.set(v, client.id)
				redis.set(client.id, v)
				redis.get(v, function(err,r){
//					console.log('redis', r)
				})
			})
			//链接关闭
			client.on('disconnect', () => {
				redis.get(client.id, function(err,v){
					redis.del(v)
					redis.del(client.id)
				})
			});
		});
		
	}
	sendToUid(){}
}
module.exports = Message