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
	return new Promise((resolve, reject) => {
		request({
			uri: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1299b7bcc960dd8f&secret=5b6ecde3663891b2ecfe638215836676',
			type: 'GET',
			encoding: null
		}, (err, response, body) => {
			if(err) {
				return reject(err)
			}
			return resolve(body)
		})
	})
}
//  ========== 
//  = 创建公众号菜单 = 
//  ========== 

route.post('/createMenu', async(ctx, next) => {
	let m =  {
     "button":[
     {    
          "type":"click",
          "name":"今日歌曲",
          "key":"V1001_TODAY_MUSIC"
      },
      {
           "name":"菜单",
           "sub_button":[
           {    
               "type":"view",
               "name":"搜索",
               "url":"http://www.soso.com/"
            },
            {
                 "type":"miniprogram",
                 "name":"wxa",
                 "url":"http://mp.weixin.qq.com",
                 "appid":"wx286b93c14bbf93aa",
                 "pagepath":"pages/lunar/index"
             },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }]
       }]
 }
	var token
	await access_token().then(async res => {
		
		token = JSON.parse(res.toString('utf-8')).access_token
	})
	let url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token;
	await request({
		url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: m
	}, (e, r, b) => {
		console.log(b)
		return ctx.response.body = b.toString('utf-8')
		})
//	await request({
//		uri: 'https://api.weixin.qq.com/cgi-bin/menu/create',
//		type: 'POST',
//		encoding: null
//	}, () => {
//		
//	})
})
module.exports = route;