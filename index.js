'use strict';

var through         = require('through2');
var NgAutoBootstrap = require('ng-autobootstrap');
var File            = require('vinyl');

var bootstrangulify = function(options) {
	var filePaths = [];
	var ngAutoBootstrap = new NgAutoBootstrap(options);

	var stream = through.obj(function(file, enc, callback) {
		filePaths.push(file.relative);

		callback();
	}, function() {
		var contents = ngAutoBootstrap.bootstrap(filePaths);

		this.push(new File({
			path: ngAutoBootstrap.options.bootstrap.path,
			contents: new Buffer(contents)
		}));

		this.push(null);
	});

	return stream;
};

module.exports = bootstrangulify;