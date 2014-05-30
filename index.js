// detect if this script is being executed directly
if (require.main === module) {
	require('./src/cli');
}

// otherwise, if this script is being executed via require()
else {
	module.exports = require('./src/require');
}