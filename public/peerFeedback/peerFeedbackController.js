(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('peerFeedbackController', [peerFeedbackController]);

    function peerFeedbackController() {
			var vm = this;

			function init() {
				vm.tagline = 'Peer feedback';
			};

			vm.loadData = function () {
			};

			init();
	};
})();
