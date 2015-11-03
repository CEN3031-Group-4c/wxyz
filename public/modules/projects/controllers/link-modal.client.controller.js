'use strict';

angular.module('projects').controller('LinkModalController', ['$scope', '$modalInstance', '$sce', 'Projects', 'prjId', 'eleId',
	function($scope, $modalInstance, $sce, Projects, prjId, eleId) {

	$scope.sc = $sce;  // html security for ckeditor text
	$scope.project = Projects.get({ projectId: prjId });  // find project in the database
	$scope.elementId = eleId;  // save element id (index)
	console.log('This is the controller firing up');
	console.log('modalProjectTitle');
	//console.log('Project id: '+prjId);
	//console.log('Element id: '+eleId);
}]);
