(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('loginController', ['$rootScope', 'associateService', loginController]);

    function loginController($rootScope, associateService) {
        var vm = this;

        function init() {
            vm.credentials = {};
            vm.credentials.email = "akumar@spiderlogic.com";
            vm.credentials.password = "password";
        };

        vm.login = function(){
            vm.loginError = null;
            associateService.login(vm.credentials)
                .then(function(data){
                    if(data.success){
                        $rootScope.$emit('spider.portal.login.success.event', data.user);
                        return;
                    }
                    vm.loginError = data.message;
                    $rootScope.$emit('spider.portal.login.failure.event');
                }, function(error){
                  vm.loginError = error;
                  $rootScope.$emit('spider.portal.login.failure.event');
                });
        };

        init();
	};
})();
