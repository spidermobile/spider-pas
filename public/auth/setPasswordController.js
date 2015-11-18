(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('setPasswordController', ['$rootScope', 'associateService', '$stateParams', '$state', setPasswordController]);

    function setPasswordController($rootScope, associateService, $stateParams, $state) {
        var vm = this;
        var uid = $stateParams.uid;

        function loadUser() {
            associateService.query({"uid": uid}).then(
                function(users){
                    if(users.length != 1){
                        $state.go("error");
                    }else{
                        vm.user = users[0];
                        if(!vm.user.active){
                            vm.credentials = {
                                email: vm.user.email,
                                password: '',
                                confirmPassword: ''
                            };
                        } else {
                            $state.go("login");
                        }
                    }
                },
                function(){
                    $state.go("error");
                }
            );
        }

        vm.setPassword = function(){
            vm.user.password = vm.credentials.password;
            associateService.savePassword(vm.user).then(
                function(user){
                    $rootScope.showSuccess("password set successfully");
                    $state.go("login");
                },
                function(){
                    $rootScope.showError("error occured");
                }
            )
        };

        function init() {
            if(uid) {
                loadUser();
            } else {
                $state.go("error");
            }
        }

        init();
	};
})();
