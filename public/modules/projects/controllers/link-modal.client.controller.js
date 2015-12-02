'use strict';

angular.module('projects').controller('LinkModalController', ['$scope', '$modalInstance', '$sce', 'Projects', 'prjId', 'eleId',
	function($scope, $modalInstance, $sce, Projects, prjId, eleId) {

	$scope.sc = $sce;  // html security for ckeditor text
	$scope.project = Projects.get({ projectId: prjId });  // find project in the database
	$scope.elementId = eleId;  // save element id (index)

	$scope.lookupElement = function(){
		var project = $scope.project;
		if(!eleId) {
			console.log('EleId undefined');
			console.log(project);
			return project.elements;
		} else {
			for(var i=0; i < project.elements.length; i++ )
			{
				if( project.elements[i]._id === $scope.elementId ){
						return project.elements[i];

				}
			}
		}
		return false;

	};

	//$scope.targetElement = $scope.lookupElement();

	//console.log('Project id: '+prjId);
	//console.log('Element id: '+eleId);
}]);
