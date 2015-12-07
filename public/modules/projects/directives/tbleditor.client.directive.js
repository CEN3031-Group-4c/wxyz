'use strict';

//ckEditor custom directive. Allows for using ck-editor to replace
//a textarea with the nice rich text editor. This directive customizes
//the toolbar specifically for inserting tables.
angular.module('projects').directive('tblEditor', function() {
    return {
        require : '?ngModel',
        link : function($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0],

              {
                toolbar : [
                    { name: 'insert', items: [ 'Table' ] },
                    { name: 'styles', items: [ 'Font', 'FontSize' ] },
		                { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                    { name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
                    '/',
		                { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] }
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
