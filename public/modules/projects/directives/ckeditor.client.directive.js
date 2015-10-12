'use strict';

//ckEditor custom directive. Allows for using ck-editor to replace
//a textarea with the nice rich text editor. Still need to figure
//out how to customize the type of buttons available on the editor
//so we can reuse this for the equations editor as well.
angular.module('projects').directive('ckEditor', function() {
    return {
        require : '?ngModel',
        link : function($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);

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
