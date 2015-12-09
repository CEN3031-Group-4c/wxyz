//This is the controller for our project-modal view. Its main function is to link the selected
//project into the modal view

'use strict';

angular.module('projects').controller('LinkModalController', ['$scope', '$modalInstance', '$sce', 'Projects', 'prjId', 'eleId',
	function($scope, $modalInstance, $sce, Projects, prjId, eleId) {

	$scope.sc = $sce;  // html security for ckeditor text
	  // find project in the database
	$scope.elementId = eleId;  // save element id (index)
	$scope.selectedProject = 'this is the project test';

	$scope.resultArray = false; //some default dummy value for resultArray

	//This function is called by the modal view, it serves the purpose of populating the view elements based on the selection
	$scope.lookupElement = function(){
				var result;
				//utilize a callback, so that the Project.get (async) finishes before the view loads
				$scope.selectedProject = Projects.get({ projectId: prjId },function(){
				$scope.project = $scope.selectedProject;
				console.log($scope.selectedProject.elements.length);
				if(!eleId) {
					console.log('EleId undefined');
					$scope.resultArray = 	$scope.selectedProject.elements;
					console.log($scope.resultArray);
					return $scope.selectedProject.elements;
				} else {
					for(var i=0; i < $scope.selectedProject.elements.length; i++ )
					{
						if($scope.selectedProject.elements[i]._id === $scope.elementId ){
							//if the user selected a specfic element, then we need to return it as a collection
							//for processing by ng-repeat
								var newArray = [$scope.selectedProject.elements[i]];
								$scope.resultArray = 	newArray;

								return 	$scope.selectedProject.elements[i];

						}
					}
				}

				





		}); // ends Project.get



	}; // ends lookupElement


	$scope.helloWorld = function(){

			console.log('hello world, lets see if this comes before the inner workings of the function');

	};



	//$scope.targetElement = $scope.lookupElement();

	//console.log('Project id: '+prjId);
	//console.log('Element id: '+eleId);
}]);
