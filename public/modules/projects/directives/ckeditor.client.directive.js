'use strict';

//ckEditor custom directive. Allows for using ck-editor to replace
//a textarea with the nice rich text editor. This directive gives
//us the "main" editor, which has many included features. Other
//directives wil customize the toolbar to limit features to
//specific desired things such as equations, tables, etc.
angular.module('projects').directive('ckEditor', function() {
    return {
        require : '?ngModel',
        link : function($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0],


              {
                toolbar : [
		                { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		                { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
		                { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		                '/',
		                { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
		                { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
		                '/',
		                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
		                { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'EqnEditor' ] },
		                '/',
		                { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		                { name: 'colors', items: [ 'TextColor', 'BGColor' ] }
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
