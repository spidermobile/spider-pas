(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('myFeedbackController', ['myFeedbackService', myFeedbackController]);

    function myFeedbackController(myFeedbackService) {
			var vm = this;

			function init() {
				vm.tagline = 'My feedback';

        vm.tableDatasource = myFeedbackService;

        vm.tableOptions = {
      		autoLoad: true,
      		id: "my-feedback",
      		pageSize: 8,
      		currentPage: 1,
      		maxPageControls: 4,
      		sortExpression: "name",
      		sortOrder: "asc",
      		columnDefs: [
      			{ field: 'name', displayName: 'Name', sort: true, search: false},
      			{ field: 'status', displayName: 'Status', sort: true, search: false},
      			{ field: 'dueDate', displayName: 'Due Date', sort: true, search: false}
      		]
      	};

      	vm.tableEmptyMessage = "There are no feedbacks";
      	vm.tableSharedData = {
      		showMessage: false,
      		showTable: true,
      		search: {}
      	};
			};

			vm.loadData = function () {
			};

    	vm.showLoading = function(){

    	};

    	vm.hideLoading = function(){

    	};

			init();
	};
})();
