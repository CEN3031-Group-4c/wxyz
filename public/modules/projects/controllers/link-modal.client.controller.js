'use strict';

angular.module('projects').controller('LinkModalController', ['$scope', '$modalInstance', '$sce', 'Projects', 'prjId', 'eleId',
	function($scope, $modalInstance, $sce, Projects, prjId, eleId) {

	$scope.sc = $sce;  // html security for ckeditor text
	  // find project in the database
	$scope.elementId = eleId;  // save element id (index)
	$scope.projectTest = 'this is the project test';

	$scope.resultArray = false;
	$scope.lookupElement = function(){
		var result;
		console.log('got into the function');
		console.log('the value of projectId is:');
		console.log(prjId);
		$scope.projectTest = Projects.get({ projectId: prjId },function(){
				$scope.project = $scope.projectTest;
				console.log($scope.projectTest.elements.length);
				if(!eleId) {
					console.log('EleId undefined');
					$scope.resultArray = 	$scope.projectTest.elements;
					console.log($scope.resultArray);
					return $scope.projectTest.elements;
				} else {
					for(var i=0; i < $scope.projectTest.elements.length; i++ )
					{
						if($scope.projectTest.elements[i]._id === $scope.elementId ){
								var newArray = [$scope.projectTest.elements[i]];
								$scope.resultArray = 	newArray;

								return 	$scope.projectTest.elements[i];

						}else{
								console.log('No result was found');
						}
					}
				}

				//$scope.resultArray = false;
				//return false;





		}); // ends Project.get



	}; // ends lookupElement


	$scope.helloWorld = function(){

			console.log('hello world, lets see if this comes before the inner workings of the function');

	};



	//$scope.targetElement = $scope.lookupElement();

	//console.log('Project id: '+prjId);
	//console.log('Element id: '+eleId);
}]);
