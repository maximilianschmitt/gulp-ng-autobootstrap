/* global describe, it */
'use strict';

var ngAutoBootstrap = require('..');
var fs              = require('fs');
var expect          = require('chai').expect;

describe('gulp-ng-autobootstrap', function() {
	it('should bootstrap module requires', function() {
		var stream = ngAutoBootstrap({});
		
		stream.on('data', function(file) {
			var expectedBootstrapFileContents = fs.readFileSync(__dirname + '/expected-bootstrap-file.txt').toString();

			expect(file.contents.toString()).to.equal(expectedBootstrapFileContents);
		});

		var filePaths = [
			'some-path/animations/module-name.js',
			'some-path/constants/module-name.js',
			'some-path/controllers/module-name.js',
			'some-path/directives/module-name.js',
			'some-path/factories/module-name.js',
			'some-path/filters/module-name.js',
			'some-path/providers/module-name.js',
			'some-path/services/module-name.js',
			'some-path/values/module-name.js'
		];

		filePaths.forEach(function(filePath) {
			stream.write({ relative: filePath });
		});

		stream.end();
	});

	it('should create bootstrap file at configured path', function() {
		var stream = ngAutoBootstrap({ bootstrap: { path: 'this/is/my/path/bootstrap.js' }});
		
		stream.on('data', function(file) {
			expect(file.relative).to.equal('this/is/my/path/bootstrap.js');
		});

		stream.end();
	});
});