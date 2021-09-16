const path = require('path');

module.exports = {
	entry: {
		module: './index.js',
		browser: './browser.js',
		bundle: './bundle.js',
		'module-bundle': './module-bundle.js'
	},
	target: "web"
};
