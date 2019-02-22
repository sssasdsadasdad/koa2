const mysqls = require('mysql');

const {dataBase} = require('../config')

 class mysql {
 	constructor(){
 		this.pool = mysqls.createPool({
			host     : '127.0.0.1',
			user     : 'root',
			password : 'root',
			database : 'test'

		});
 	}
 	query(sql){
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if(err){
					reject(err)
				} else {
					connection.query(...sql, (err, row, r) => {
						if(err){
							reject(err)
						} else {
							resolve(row);
						}
					})
					//
					connection.release();
				}
			})
		})

 	}
 }
module.exports = new mysql;