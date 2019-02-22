var minimist = require('minimist');

const isProduct = minimist(process.argv.slice(2)).hasOwnProperty('product') ? true : false;
if(isProduct){
	module.exports = require('./product')
} else {
	module.exports = require('./develop')
	
}
