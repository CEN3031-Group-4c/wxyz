'use strict';

module.exports = {
	app: {
		title: 'MEAN.JS',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/textAngular/src/textAngular.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/mathquill-0.9.4/mathquill.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-flow/dist/ng-flow-standalone.js',
				'public/lib/ng-file-upload/angular-file-upload-all.js',
				'public/lib/ng-file-upload-shim/angular-file-upload-shim.js',
				'public/lib/ngDraggable/ngDraggable.js',
				'public/lib/ngDialog/js/ngDialog.js',
				'public/lib/rangy/rangy-core.js',
				'public/lib/rangy/rangy-cssclassapplier.min.js',
				'public/lib/rangy/rangy-selectionsaverestore.min.js',
				'public/lib/rangy/rangy-serializer.min.js',
				'public/lib/textAngular/src/textAngular.js',
				'public/lib/textAngular/src/textAngular-sanitize.js',
				'public/lib/textAngular/src/textAngularSetup.js',
				'public/lib/angular-google-chart/ng-google-chart.js',
				'public/lib/jquery/dist/jquery.js',
				'public/lib/mathquill-0.9.4/mathquill.js',
				'public/lib/mathquill-0.9.4/mathquill-main.js',
				'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured&dummy=.js',
				'public/ckeditor/ckeditor.js',           //
				'public/ckeditor/build-config.js',       //
				'public/ckeditor/config.js',             //Added these references for ckeditor
				'public/ckeditor/styles.js'              //

			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
