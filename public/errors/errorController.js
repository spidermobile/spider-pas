(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('errorController', ['$stateParams', loginController]);

    function loginController($stateParams) {
        var vm = this;

        function init() {
            vm.errorCode = $stateParams.status;
            if (vm.errorCode == 404 || vm.errorCode == 418) {
                vm.errorMsg = $stateParams.message ? $stateParams.message : "The page you requested cannot be found.";
                vm.errorDesc = "Maybe the page you requested was moved or deleted, or perhaps you just mistyped \n"
                + "the address.\n\n"
                + "Why not try and find your way using navigation bar above or click on the logo to "
                + "return to home page";
            } else if (vm.errorCode == 500) {
                vm.errorMsg = $stateParams.message ? $stateParams.message : "The server encountered an internal error";
                vm.errorDesc = "Please refresh the page and try again. If you are getting this error again,\n"
                + "Please report the admin with proper description of the error and steps to reproduce.\n\n"
                + "Please return to home page by clicking the logo above.\n\n"
                + "Thank you for you kind support.";
            } else if (vm.errorCode == 403) {
                vm.errorMsg = $stateParams.message ? $stateParams.message : "Unauthorized: Access is denied";
                vm.errorDesc = "You do not have permission to view this directory or page using the credentials that you supplied.\n\n"
                + "Contact administrator to access this page.\n\n"
                + "Thank you for you kind support.";
            } else {
                vm.errorMsg = $stateParams.message ? $stateParams.message : "Unknown Error";
                vm.errorDesc = "Contact administrator.\n\n"
                + "Thank you for you kind support.";
            }
        };

        init();
	};
})();
