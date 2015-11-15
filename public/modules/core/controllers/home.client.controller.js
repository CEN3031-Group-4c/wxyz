'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', 'Projects', '$location', '$state', '$stateParams',
	function($scope, $rootScope, Authentication, Projects, $location, $state, $stateParams) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.foundTop = false;
		$scope.previewTop = {};
		$rootScope.inPreview = false;
		$scope.state = $state;

	// sets isOpenAcc var which controls whether the accordion should be open
	// runs from accordion ng-init or on first page load
	$scope.checkOpenInit = function() {
		var currProjectId = $stateParams.projectId;
		var parentProject = $scope.resolveTop($scope.lookup(currProjectId));
		for(var i = 0; i < $scope.projects.length; i++) {
			if($scope.projects[i].children.length && $scope.projects[i]._id === parentProject._id) {
				$scope.projects[i].isOpenAcc = true;
			} else {
				$scope.projects[i].isOpenAcc = false;
			}
		}
	};

	$scope.isActive = function(id){
		if(id === $stateParams.projectId){
			return true;
		}
		else{
			return false;
		}
	};

	// need to move variables and delete the function
	$scope.find = function() {
		$scope.projects = Projects.query();
		$scope.frame1 = $rootScope.frame1;
		$scope.frame2 = $rootScope.frame2;
	};
	/*
	$scope.accordian_stuff = function(project)
	{
		$location.path('projects/' + project._id);
	};
	*/
	$scope.preview_stuff = function(project)
	{
		$location.path('projects/' + project._id + '/preview');
	};
	$scope.setPreviewStatus = function(status)
	{
		$rootScope.inPreview = status;
	};
	$scope.getProjectId = function()
	{
		var full_path = $location.path();
		if (full_path.indexOf('/projects/') !== 0) return false;
		var reduced_path = full_path.replace('/projects/', '');
		if (reduced_path.indexOf('/') === -1) return reduced_path;
		return reduced_path.substring(0,reduced_path.indexOf('/'));
	};
	/*$scope.isProjectOpen = function(project)
	{
		if (!$scope.getProjectId()) return false;
		var top = $scope.resolveTop($scope.lookup($scope.getProjectId()));
		if (top._id === project._id) return true;
		return false;
	};*/
	// need to look into this function
	$scope.isCourseOpen = function(project)
	{
		if (!$scope.getProjectId()) return false;
		var top = $scope.resolveCourse($scope.lookup($scope.getProjectId()));
		if (top._id === project._id) return true;
		return false;
	};
	$scope.lookup = function(id)
	{
		var projects = $scope.projects;
		for (var i =0; i < projects.length; i++)
		{
			if (projects[i]._id === id) return projects[i];
		}
		return false;
	};
	$scope.resolveTop = function(project)
	{
		var projects = $scope.projects;
		//if ($scope.foundTop) return true;

		var current = project;
		while (current.parent !== undefined)
		{
			current = $scope.lookup(current.parent);
		}
		if (current.parent === undefined)
		{
			return current;
		}
		return false;
	};
	$scope.resolveCourse = function(project)
	{
		var projects = $scope.projects;
		var current = project;
		if (current.level === 1) return false;
		while (current.level > 2)
		{
			current = $scope.lookup(current.parent);
		}
		return current;

	};

	$scope.canView = function(project)
	{
		var topProject = $scope.resolveTop(project);
		if (topProject)
		{
			if (topProject.viewPermission === 'public') return true;
			else if ($scope.authentication.user._id === topProject.user._id) return true;
			else if (topProject.viewContributers.indexOf($scope.authentication.user.email) !== -1) return true;
			else return false;
		}
	};

	$scope.projectPage = function() {

			if (document.getElementById('view_project'))
			{
				var text = document.getElementById('view_project').innerHTML;

				if (document.getElementById('html_display'))
				{
					document.getElementById('html_display').innerHTML = text;
				}
			}

			var pathArray = $location.path().split('/');
			if(pathArray[1] !== 'projects')
				return false;
			else if(!pathArray[2])
				return false;
			else if(pathArray[2] === 'new')
				return false;
			else if(pathArray[3])
				return false;
			else
				return true;
	};
	$scope.previewInit = function() {
		$scope.previewTop = $scope.resolveTop($scope.lookup($scope.getProjectId()));
	};
	$scope.link = function($event, id) {
		$event.stopPropagation();
		$scope.state.go('home.viewProject', {projectId:id});
	};
	$scope.link_prev = function($event, id){
		$event.stopPropagation();
		$location.path('projects/'+id+'/preview');
	};
	}

]);
