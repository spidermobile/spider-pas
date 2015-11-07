(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('loginService', ['$resource', '$q', 'associateService', 'apiService', loginService]);

      function loginService($resource, $q, associateService, apiService) {

          var resource = $resource(apiService.baseUrl(), null, {
              login: {
                  method: "POST",
                  url: apiService.resolveUrl("login")
              }
          });
          function login(email, password) {
              return $q(function (resolve, reject) {
                  resource.login({},{email: email, password: password},
                      function (data) {
                        if(data.success){
                          associateService.setLoggedUser(data.user);
                          resolve(data);
                        }
                        reject(data.message);
                      }, function (error) {
                          reject(error);
                      });
              });
          };

          return {
              login: login
          };
      };
  })();
