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
              },
              login: {
                  method: "POST",
                  url: apiService.resolveUrl("login")
              }
          });

          function login(credentials) {
              return $q(function (resolve, reject) {
                  resource.login({},{email: credentials.email, password: credentials.password},
                      function (data) {
                        resolve(data);
                      }, function (error) {
                          reject(error);
                      });
              });
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
              login: login,
              getAssociates: getAssociates
          };
      };
  })();
