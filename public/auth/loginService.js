(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('loginService', ['$rootScope', loginService]);

      function loginService($rootScope) {
          return {
              login: login
          };

          function login(username, password) {
            console.log('Hi there!\n So I know that your user and password is:\n' + username + "\n" +  password);
          };
      };
  })();
