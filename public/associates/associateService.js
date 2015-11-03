(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('associateService', ['$rootScope', 'apiService', '$resource', '$q', associateService]);

      function associateService($rootScope, apiService, $resource, $q) {
          var resource = $resource(apiService.baseUrl(), null, {
              getUsers: {
                  method: "GET",
                  url: apiService.resolveUrl("associates"),
                  isArray: true
              }
          });

          function getLoggedUser() {
              return $rootScope.loggedUser;
          };

          function setLoggedUser(user) {
              $rootScope.loggedUser = user;
          };

          function getAssociates() {
              return $q(function (resolve, reject) {
                  resource.getUsers({},
                      function (data) {
                          resolve(data);
                      }, function (error) {
                          reject(error);
                      });
              });
          };

          return {
              getLoggedUser: getLoggedUser,
              setLoggedUser: setLoggedUser,
              getAssociates: getAssociates
          };
      };
  })();
