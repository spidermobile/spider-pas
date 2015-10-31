(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('loginController', ['loginService', '$state', loginController]);

    function loginController(loginService, $state) {
        var vm = this;

        function init() {
            vm.credentials = {};
            vm.credentials.username = "yourname@spiderlogic.com";
            vm.credentials.password = "what!";
        };

        vm.login = function(){
            alert("a");
            loginService.login(vm.credentials.email, vm.credentials.password);
            $state.go("home");
        };

        init();
	};
})();
