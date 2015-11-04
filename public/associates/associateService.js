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
              if(typeof(Storage) !== "undefined") {
                  if (sessionStorage.pasLoggedUser) {
                      return JSON.parse(sessionStorage.pasLoggedUser);
                  }
              }
              return null;
          };

          function setLoggedUser(user) {
              $rootScope.user = user;
              if(typeof(Storage) !== "undefined") {
                  $rootScope.loggedUser = user;
                  sessionStorage.pasLoggedUser = JSON.stringify(user);
              } else {
                  alert("Sorry, your browser does not support web storage...");
              }
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
