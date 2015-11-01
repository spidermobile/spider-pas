(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('associateService', ['$rootScope', 'apiService', '$resource', '$q', associateService]);

      function associateService($rootScope, apiService, $resource, $q) {
          return {
              getLoggedUser: getLoggedUser,
              setLoggedUser: setLoggedUser,
              getUsers: getUsers
          };

          var resource = $resource(apiService.baseUrl(), null, {
              getUsers: {
                  method: "GET",
                  url: apiService.resolveUrl("users"),
                  isArray: true
              }
          });

          function getLoggedUser() {
              return $rootScope.loggedUser;
          };

          function setLoggedUser(user) {
              $rootScope.loggedUser = user;
          };

          function getUsers() {
              return $q(function (resolve, reject) {
                  var users = [
                      {id:1, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:2, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:3, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:4, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:5, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:6, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:7, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:8, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:9, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:10, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"},
                      {id:11, firstName: "Asheesh", lastName: "Asheesh",email: "akumar@spiderlogic.com"}
                  ];
                  resolve(users);

                  //resource.getUsers({},
                  //    function (data) {
                  //        resolve(data);
                  //    }, function (error) {
                  //        reject(error);
                  //    });
              });
          };

      };
  })();
