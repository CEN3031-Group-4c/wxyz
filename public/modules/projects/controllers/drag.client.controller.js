'use strict';

angular.module('projects').controller('DragController', 
	function ($scope) {
		$scope.draggableObjects = [
			{name: 'one'},
			{name: 'two'},
			{name: 'three'},
			{name: 'four'},
			{name: 'five'},
			{name: 'six'},
		];
		$scope.onDropComplete = function (index, obj, evt) {
			var otherObj = $scope.draggableObjects[index];
			var otherIndex = $scope.draggableObjects.indexOf(obj);
			//$scope.draggableObjects[index] = obj;
			//$scope.draggableObjects[otherIndex] = otherObj;
			var difference, current_index, i;
			
			console.log('index');
			console.log(index);
			
			console.log('obj');
			console.log(obj);
			
			console.log('evt');
			console.log(evt);
			
			if (otherIndex < index)
			{
				difference = index - otherIndex;
				current_index = otherIndex;
				for (i = 0; i !== difference; ++i)
				{
					$scope.draggableObjects[current_index] = $scope.draggableObjects[++current_index];
				}
				
				$scope.draggableObjects[current_index] = obj;
			}
			else
			{
				difference = otherIndex - index;
				current_index = otherIndex;
				for (i = 0; i !== difference; ++i)
				{
					$scope.draggableObjects[current_index] = $scope.draggableObjects[--current_index];
				}
				
				$scope.draggableObjects[current_index] = obj;
			}
			
		};
	}); //
/*
	};
);
*/
