/* Uses https://github.com/joyent/node/blob/c7b02034ef80313564c50c59c63a5b640c24e234/src/node.js#L408-L430 */

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Evaluate an expression using a module as context. Loads a module and makes it
 *   available to local scope via `with`. Synchronous operation.
 * @param {string} modulePath Name of module or absolute or relative path to
 *   module.
 * @param {string} expression Valid JavaScript expression. Will have access to
 *   module via `with`.
 * @param {string=} cwd (optional) Directory for module path to be relative to.
 * @return {*} Result of expression.
 */
exports.eval = function (modulePath, expression, cwd) {
	var Module = require('module');
	var path = require('path');
	var name = '[eval]';
	var module = new Module(name);
	var jsonName = JSON.stringify(name);
	var jsonModulePath = JSON.stringify(modulePath);
	var jsonExpression = JSON.stringify(expression);
	var script = 'with(require(' + jsonModulePath + ')) { eval(' + jsonExpression + '); }';
	var body, jsonBody;
	if (!cwd) {
		cwd = process.cwd();
	}
	module.filename = path.join(cwd, name);
	module.paths = Module._nodeModulePaths(cwd);
	if (!Module._contextLoad) {
		body = script;
		jsonBody = JSON.stringify(body);
		script = [
			'global.__filename = ' + jsonName,
			'global.exports = exports',
			'global.module = module',
			'global.__dirname = __dirname',
			'global.require = require',
			'return require("vm").runInThisContext(' + jsonBody + ', { filename: ' + jsonName + ' })'
		].join(';\n');
	}
	return module._compile(script, name + '-wrapper');
};