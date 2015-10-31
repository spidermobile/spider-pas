angular.module('NerdCtrl', []).controller('NerdController',["$scope", "$rootScope", "myFeedbackService", "$timeout", function($scope, $rootScope, myFeedbackService, $timeout) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	$scope.tableDatasource = myFeedbackService;
	$scope.showLoading = function(){

	};

	$scope.hideLoading = function(){

	};

	$scope.tableOptions = {
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
	$scope.tableEmptyMessage = "There are no feedbacks";
	$scope.tableSharedData = {
		showMessage: false,
		showTable: true,
		search: {}
	};
	//$timeout(function () {
	//	$rootScope.$broadcast('reloadTable', $scope.table.id);
	//},0);


}]);