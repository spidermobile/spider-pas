(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('myFeedbackController', [myFeedbackController]);

    function myFeedbackController() {
			var vm = this;

			function init() {
				vm.tagline = 'My feedback';
			};

			vm.loadData = function () {
			};

			init();
	};
})();
