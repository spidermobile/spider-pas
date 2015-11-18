/**
 * Created by asheesh on 16/11/2015.
 */

(function () {
    'use strict';

    angular.module('spiderPortal')
        .directive("compareTo", compareTo);


    function compareTo() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    };
})();
