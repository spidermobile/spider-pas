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
              savePassword: {
                  method: "POST",
                  url: apiService.resolveUrl("associates/:id/password")
              },
              login: {
                  method: "POST",
                  url: apiService.resolveUrl("login")
              },
              query: {
                  method: "GET",
                  url: apiService.resolveUrl("associates?query=:query"),
                  isArray: true
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

          function savePassword(associate) {
              return $q(function (resolve, reject) {
                  resource.savePassword({id: associate._id},associate,
                      function (data) {
                          resolve(data);
                      }, function (error) {
                          reject(error);
                      });
              });
          };

          function query(query) {
              return $q(function (resolve, reject) {
                  resource.query({query: JSON.stringify(query)},
                      function (data) {
                          resolve(data);
                      }, function (error) {
                          reject(error);
                      });
              });
          };


          return {
              login: login,
              getAssociates: getAssociates,
              query: query,
              savePassword: savePassword
          };
      };
  })();
