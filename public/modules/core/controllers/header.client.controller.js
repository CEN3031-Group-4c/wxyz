'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', '$stateParams','$location', 'Authentication', 'Projects', 'Menus',
	function($scope, $rootScope, $stateParams, $location, Authentication, Projects, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.currentProject = $location.url();
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
			//$scope.whereAmI = $location.url();
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
			$scope.currentProject = $location.url().replace('/projects/', '');
		});
		
		$scope.frames = function(title) {
			if(title === '1-pane Canvas'){
				$rootScope.frame1 = false;
				$rootScope.frame2 = false;
			}
			else if(title === '2-pane IC/Display'){
				$rootScope.frame1 = true;
				$rootScope.frame2 = false;
			}
			else if(title === '3-pane Debug View'){
				$rootScope.frame1 = true;
				$rootScope.frame2 = true;
			}
			var proj_path = $location.path();
			$location.path('projects');
		};
		
	}
]);
