var path = require('path');
var argv = process.argv.slice(2);
var req = require('./require');

var modulePath = argv[0];
var expression = argv.slice(1).join(' ');

try {
	var result = req.eval(modulePath, expression);
	console.log(result);
}
catch (e) {
	console.error('There was an error evaluating this expression');
	throw e;
}