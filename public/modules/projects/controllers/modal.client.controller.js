'use strict';

angular.module('projects').controller('ModalController', function($scope, $modalInstance, message, project) {
	$scope.message = message;
	$scope.project = project;
	$scope.contributors = [];
	$scope.emails = [];
	$scope.email = '';
	console.log($scope.project);
	console.log($scope.message);
	if($scope.message === 'View') $scope.contributors = $scope.project.viewContributers.slice(0);
	else $scope.contributors = $scope.project.editContributers.slice(0);


	$scope.addEmail = function ()
	{
		var email = $scope.email;
		if ($scope.emails.indexOf(email) === -1) $scope.emails.push(email);
		$scope.email = '';
	};

	$scope.modal_yes = function() {
		$modalInstance.close($scope.emails);
	};

	$scope.modal_no = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.modal_ok = function() {
		$modalInstance.close();
	};
});
