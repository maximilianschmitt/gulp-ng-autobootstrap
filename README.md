# gulp-ng-autobootstrap

> Automatically generate bootstrap files for your browserify-powered angular apps that pull in all your angular modules (like controllers and directives) for you.
>
> Inspired by [ng-classify](https://github.com/CaryLandholt/ng-classify).

## Usage

#### 1. Install via npm

```
npm install gulp-ng-autobootstrap
```

#### 2. Include in your gulp file

``` js
var ngAutoBootstrap = require('gulp-ng-autobootstrap');

gulp.task('autobootstrap', function() {
	return gulp
		.src('js/**/*.js')
		.pipe(ngAutoBootstrap(options))
		.pipe(gulp.dest('./bootstrap.js'));
});
```

#### Options

Options are passed to the [ng-autobootstrap](https://github.com/maximilianschmitt/ng-autobootstrap) module behind the scenes. Check out the [documentation on options](https://github.com/maximilianschmitt/ng-autobootstrap#options) there.

## How it works

Consider an angular app with many controllers, directives, services, animations – like this one:

```
controllers/
	app-controller.js
	users-controller.js
	posts-controller.js
	login-controller.js
	signup-controller.js
	account-controller.js
directives/
	autosize.js
	blur-on.js
	doubleclick-to-edit.js
	parse-markdown.js
services/
	api-service.js
	auth-service.js
	user-service.js
	post-service.js
main.js
```

### Pull in a single file to hook everything up

#### main.js

``` js
var app = angular.module('myApp', []);
require('./bootstrap.js')(app);
```

ng-autobootstrap automatically creates the bootstrap-file that include all these angular modules and hooks them up with your app. This could look like this:

#### bootstrap.js

``` js
'use strict';

module.exports = function(app) {
	// Controllers
	app.controller('AppController', require('./controllers/app-controller'));
	app.controller('UsersController', require('./controllers/users-controller'));
	app.controller('PostsController', require('./controllers/posts-controller'));
	app.controller('LoginController', require('./controllers/login-controller'));
	app.controller('SignupController', require('./controllers/signup-controller'));
	app.controller('AccountController', require('./controllers/account-controller'));
	// Directives
	app.directive('autosize', require('./directives/autosize'));
	app.directive('blurOn', require('./directives/blur-on'));
	app.directive('doubleclickToEdit', require('./directives/doubleclick-to-edit'));
	app.directive('parseMarkdown', require('./directives/parse-markdown'));
	// Services
	app.service('ApiService', require('./services/api-service'));
	app.service('AuthService', require('./services/auth-service'));
	app.service('UserService', require('./services/user-service'));
	app.service('PostService', require('./services/post-service'));
};
```

## Fully Customizable

* Configure path and name for your bootstap file
* Configure any casing convention for your module names (`camelCase`, `PascalCase`, `Title Case`, `snake_case`, `lowercase`, `UPPERCASE`, `CONSTANT_CASE` and more)
* Configure prefixes and suffixes for your module names (`AppCtrl`, `AppController`, just `App` or anything you like) 
* Organize your modules how you like