'use strict';

angular.module('projects').controller('LinkModalController', ['$scope', '$modalInstance', '$sce', 'Projects', 'prjId', 'eleId',
	function($scope, $modalInstance, $sce, Projects, prjId, eleId) {

	$scope.sc = $sce;  // html security for ckeditor text
	  // find project in the database
	$scope.elementId = eleId;  // save element id (index)
	$scope.ranOnce = false;
	$scope.lookupElement = function(){
		var result;
		console.log('got into the function');
		console.log('the value of projectId is:');
		console.log(prjId);
		var project = Projects.get({ projectId: prjId },function(){
			console.log($scope.ranOnce);
			if($scope.ranOnce === false){

				$scope.ranOnce = true;
				console.log('Did we crash?');
				console.log(project.elements.length);
				if(!eleId) {
					console.log('EleId undefined');
					console.log(project);
					return project.elements;
				} else {
					for(var i=0; i < project.elements.length; i++ )
					{
						if( project.elements[i]._id === $scope.elementId ){
								console.log('Crashing at element selection');
								return project.elements[i];

						}
					}
				}


				return false;


			} // ends if statement


		}); // ends Project.get



	}; // ends lookupElement

	//$scope.targetElement = $scope.lookupElement();

	//console.log('Project id: '+prjId);
	//console.log('Element id: '+eleId);
}]);
