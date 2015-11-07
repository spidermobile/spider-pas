(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('loginController', ['$rootScope', 'loginService', '$state', loginController]);

    function loginController($rootScope, loginService, $state) {
        var vm = this;

        function init() {
            vm.credentials = {};
            vm.credentials.email = "akumar@spiderlogic.com";
            vm.credentials.password = "password";
        };

        vm.login = function(){
            vm.loginError = null;
            $rootScope.$broadcast('showOverlay');
            loginService.login(vm.credentials.email, vm.credentials.password)
                .then(function(data){
                    if(data.success){
                        $rootScope.$broadcast('hideOverlay');
                        $state.go("myfeedback");
                    }
                }, function(error){
                    $rootScope.$broadcast('hideOverlay');
                    vm.loginError = error;
                });
        };

        init();
	};
})();
