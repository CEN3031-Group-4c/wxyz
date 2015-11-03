'use strict';

var routerApp = angular.module('routerApp',['ui.router']);

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
		.state('home', {
			url: '/',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@home': { templateUrl: 'modules/core/views/homeView.client.view.html' }
			}
		})
		.state('home.test1', {
			url:'/test1',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@home': { templateUrl: 'modules/core/views/test1.client.view.html' }
			}
		})
		.state('home.test2', {
			url:'/test2',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@home': { templateUrl: 'modules/core/views/test2.client.view.html' }
			}
		})
		//This displays articles on the left eventually
		.state('home.article', {
			url:'/view/:articleId',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@home': { templateUrl: 'modules/projects/views/view-article.client.view.html' }
			}
		})

		// Routing of the buttons that are under Test Page 2
		.state('home.test2.course', {
			url: '/course',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'columnOne@home.test2': { template: 'Dynamically insert a new course into the hierarchy.' }
			}
		})
		.state('home.test2.topic', {
			url: '/topic',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'columnOne@home.test2': { template: 'Dynamically insert a new topic into the hierarchy.' }
			}
		})
		.state('home.test2.lesson', {
			url: '/lesson',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'columnOne@home.test2': { template: 'Dynamically insert a new lesson into the hierarchy.' }
			}



		});
	}
]);
