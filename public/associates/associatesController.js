(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('associatesController', ['$rootScope', associatesController]);

    function associatesController($rootScope) {
			var vm = this;

			function init() {
				vm.tagline = 'Associates';
			};

			vm.loadData = function () {
			};

			init();
	};
})();
