(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('viewFeedbackController', [viewFeedbackController]);

    function viewFeedbackController() {
			var vm = this;

			function init() {
				vm.tagline = 'View feedback';
				vm.html = "";
				vm.editorHandler = {
					id: "html-editor",
					config: {}
				};
			};

			vm.loadData = function () {
			};

			init();
	};
})();
