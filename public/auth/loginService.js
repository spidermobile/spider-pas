(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('loginService', ['associateService', loginService]);

      function loginService(associateService) {
          return {
              login: login
          };

          function login(username, password) {
              associateService.setLoggedUser({name: username});
              console.log('Hi there!\n So I know that your user and password is:\n' + username + "\n" +  password);
          };
      };
  })();
