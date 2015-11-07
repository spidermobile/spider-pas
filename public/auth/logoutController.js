(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('logoutController', ['$scope', '$rootScope', logoutController]);

    function logoutController($scope, $rootScope) {
      $scope.logout = function () {
          $rootScope.$emit('spider.portal.logout.event', [{}]);
      };

      $scope.logout();
	};
})();
