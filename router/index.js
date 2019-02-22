const login = require('./login');
const wechat = require('./wechat');
module.exports = function (app){
	app.use(login.routes());
	app.use(wechat.routes());
}