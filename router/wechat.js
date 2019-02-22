const router = require('koa-router');
const crypto = require('crypto')
const request = require('request')
let route = new router({
	prefix: '/api'
})
//  ========== 
//  = 微信鉴权 = 
//  ========== 
route.get('/testify', async(ctx, next) => {
	ctx.response.body = await checkSignature(ctx.request.query);
})
const checkSignature = (q) => {
    var signature = q.signature;
    var echostr = q.echostr;
    var token = 'ceshi';
    var timestamp = q.timestamp;
    var nonce = q.nonce;

    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    if (code == signature) {
        return echostr;
    }
    return 'error';
}

const access_token = () => {
	request({
		uri: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1299b7bcc960dd8f&secret=5b6ecde3663891b2ecfe638215836676',
		type: 'GET',
		encoding: null
	})
}
//  ========== 
//  = 创建公众号菜单 = 
//  ========== 

route.post('/createMenu', async(ctx, next) => {
	await request({
		uri: 'https://api.weixin.qq.com/cgi-bin/menu/create',
		type: 'POST',
		encoding: null
	}, () => {
		
	})
})
module.exports = route;