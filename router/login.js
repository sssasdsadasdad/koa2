const route = require('koa-router');
const {reg, uniqueName, login} = require('../model/login');
const {hostImg} = require('../util');
const sha1 = require('sha1');
//const queryString = require('queryString');
let router = new route({
	prefix: '/api'
})
router.post('/reg', async(ctx, next) => {

	let {password, confirm, name} = ctx.request.body;
	if(!name){
		return ctx.body = {code: 2001, msg: '没有用户名!'}
	}
	if(!password){
		return ctx.body = {code: 2001, msg: '没有密码!'}
	}
	if(password !== confirm){
		return ctx.body = {code: 2001, msg: '两次密码不一致!'}
	}
	
	await uniqueName(name).then(async res => {
		if(res[0]['COUNT(1)']){
			return ctx.response.body = {
			  	code: 2001,
			  	msg:'用户名已被注册',
			}
		} 
		await reg(name, sha1(password), Date.now()).then(res => {
			if(res){
				return ctx.response.body = {
				  	code: 2000,
				  	msg:'注册成功',
				}
			} else {
				return ctx.response.body = {
				  	code: 2001,
				  	msg:'注册失败',
				}
			}
		})	
		
	})}).post('/login', async(ctx, next) => {
		let {name, password} = ctx.request.body;
		await login(name).then(res => {
			if(res.length === 0){
				return ctx.response.body = {
				  	code: 2001,
				  	msg:'没有此用户',
				}
				 
			}
			if(res[0]['password'] === sha1(password)){
				ctx.response.body = {
				  	code: 2000,
				  	msg:'登录成功',
				}
			} else {
				ctx.response.body = {
				  	code: 2001,
				  	msg:'密码不正确',
				}
			}
			
		})
	}).post('/hostImg', hostImg)

module.exports = router;
