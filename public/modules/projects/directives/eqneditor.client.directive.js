'use strict';

//ckEditor custom directive. Allows for using ck-editor to replace
//a textarea with the nice rich text editor. This specific directive
//only shows buttons useful when adding/editing an eqaution to
//the project.
angular.module('projects').directive('eqEditor', function() {
    return {
        require : '?ngModel',
        link : function($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0],
              {
                toolbar : [
		                { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight'] },
		                { name: 'insert', items: [ 'SpecialChar', 'EqnEditor' ] }
	                 ]
              }
            );

            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });

            ck.on('change', function() {
                $scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                    });
            });

            ngModel.$render = function(value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
});
