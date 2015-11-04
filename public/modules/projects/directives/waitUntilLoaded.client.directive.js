'use strict';

angular.module('projects').directive('waitUntilLoaded', function() {
    return function(scope, element, attrs) {
        if(scope.$last) {
            scope.$eval(attrs.waitUntilLoaded);
        }
    };
});
