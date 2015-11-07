(function() {
    'use strict';

    angular.module('spiderPortal')
      .controller('rootController', ['$rootScope', '$scope', '$state', '$location', '$http', '$localStorage', rootController]);

    function rootController($rootScope, $scope, $state, $location, $http, $localStorage) {
        $scope.setCurrentUser = function(user) {
            $localStorage.user = user;
            $rootScope.user = user;
        };

        $scope.resetCurrentUser = function(user) {
            $rootScope.user = null;
            $localStorage.$reset();
        };

        $rootScope.currentUser = function() {
            return $localStorage.user;
        };

        $rootScope.isAuthenticated  = function (){
            return $rootScope.currentUser() != null;
        };

        $rootScope.isAdmin = function (){
            var user = $rootScope.currentUser();
            return user && user.roles.indexOf("Admin") >= 0;
        };

        $rootScope.currentState = function(){
            return $state.current;
        };

        $rootScope.setTextAreaHeight = function (textarea) {
            $(textarea).css("height", (textarea.scrollHeight - 22) + "px");
            var currentHeight = textarea.scrollHeight - 2;
            $(textarea).css("height", currentHeight + "px");
        };

        $rootScope.showError = function(errorMsg){
            alert(errorMsg);
        };

        var loginSuccessCleanup = $rootScope.$on("spider.portal.login.success.event", function(event, user) {
            $scope.setCurrentUser(user);
            $state.go("myfeedback");
        });

        var loginFailureCleanup = $rootScope.$on("spider.portal.login.failure.event", function() {
            $scope.resetCurrentUser();
        });

        var logoutCleanup = $rootScope.$on("spider.portal.logout.event", function() {
            $scope.resetCurrentUser();
            $state.go('login');
        });

        $scope.$on('$destroy', function() {
            logoutCleanup();
        });
    };


    angular.module('spiderPortal')
        .run(['$rootScope', '$state', '$http', runThis]);

    function runThis($rootScope, $state, $http) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.requireLogin;

       if (requireLogin && !$rootScope.isAuthenticated()) {
          event.preventDefault();
          $state.go('login');
        }
        if (toState.requireAdmin && !$rootScope.isAdmin()) {
           event.preventDefault();
           $state.go('error', {status: 403});
         }
      });
    };
})();
