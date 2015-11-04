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
            loginService.login(vm.credentials.email, vm.credentials.password)
                .then(function(data){
                    if(data.success){
                        $state.go("myfeedback");
                    }
                }, function(){
                    $rootScope.showError("Erroe Occured");
                });
        };

        init();
	};
})();
