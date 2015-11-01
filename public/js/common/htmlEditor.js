/**
 * Created by asheesh on 01/11/2015.
 */
(function() {
    'use strict';

    angular.module('spiderPortal')
        .directive('htmlEditor', [htmlEditor]);

    function htmlEditor() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/common/htmlEditor.html',
            scope: {
                containerId: "=",
                config: "=",
                html: "="
            },
            controller: ['$scope', '$rootScope', '$timeout', '$sce', '$interval',
                function ($scope, $rootScope, $timeout, $sce, $interval) {

                var defaultOptions = {
                    removePlugins: 'magicline, elementspath',
                    toolbar: [
                        { name: 'basicstyles', groups: [ 'basicstyles' ], items: [ 'Bold', 'Italic', 'Underline'] },
                        { name: 'paragraph', groups: [ 'list'], items: [ 'NumberedList', 'BulletedList'] }
                    ],
                    toolbarGroups: [
                        { name: 'basicstyles', groups: [ 'basicstyles'] },
                        '/',
                        { name: 'paragraph', groups: [ 'list'] }
                    ]
                };

                angular.extend($scope.config, defaultOptions);

                $scope.createEditor = function () {
                    if ($scope.editor)
                        return;
                    $scope.editor = CKEDITOR.appendTo($scope.containerId + "-editor", $scope.config, "");
                };

                $timeout(function(){
                    $scope.createEditor();
                });
            }]
        };
    };
})();
