(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('logoutController', [logoutController]);

    function logoutController() {
			var vm = this;

			function init() {
				vm.tagline = 'Logout';
			};

			vm.loadData = function () {
			};

			init();
	};
})();
