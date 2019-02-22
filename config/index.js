var minimist = require('minimist');

let product = minimist(process.argv.slice(2)).hasOwnProperty('product') ? true : false;
let config = {}

if(product) {
	config = () => import('./product')
} else {
	config = () => import('./product')
}
config().then(res => {
	module.exports = res
})