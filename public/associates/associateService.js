(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('associateService', ['$rootScope', associateService]);

      function associateService($rootScope) {
          return {
              getLoggedUser: getLoggedUser,
              setLoggedUser: setLoggedUser
          };

          function getLoggedUser() {
              return $rootScope.loggedUser;
          };

          function setLoggedUser(user) {
              $rootScope.loggedUser = user;
          };

      };
  })();
