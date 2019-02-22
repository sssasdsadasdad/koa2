//工具类函数
const request = require('request');
const fs = require('fs');
const md5 = require('md5');
const path = require('path')
//const child_process = require('child_process');		//子进程
//外网图片转本站
exports.hostImg = async ( ctx, next ) => {
	
	await new Promise( function ( resolve, reject ) {
			let {url} = ctx.request.body;
			request( {
				method: 'GET',
				encoding: null,
				url
			}, function ( err, response, body ) {
				if ( err ) {
					return reject( err )
				}
				resolve( body )
			} )
		} )
		.then( ( body ) => {
				let base64img = body.toString('base64');
			
				ctx.response.status = 200
				ctx.response.body = 'data:image\/\w+;base64,' + base64img

		} )
		.catch( ( err ) => {
			console.error( err )
		} )

}

//保存base64图片至本地

exports.saveImg = (base64, dirname, name) => {
	let imgBuffer = new Buffer.from(base64, 'base64');
	name = name ? name : md5(new Date().getTime() + Math.floor(Math.random() * 1000 + 1000));
	fs.existsSync(dirname) === false && mkdirs(path.resolve(dirname));
	let w = fs.createWriteStream(`${dirname}${name}.jpg`);
	w.write(imgBuffer)
}


//创建多级目录
exports.mkdirs = (dirpath) => {
    if (!fs.existsSync(path.dirname(dirpath))) {
      mkdirs(path.dirname(dirpath));
    }
    fs.mkdirSync(dirpath);
}

//exports.mkdirs = mkdirs