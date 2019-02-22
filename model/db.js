const mysqls = require('mysql');

const {dataBase} = require('../config')
   class mysql {
   	constructor(){
   		this.pool = mysqls.createPool(dataBase);
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