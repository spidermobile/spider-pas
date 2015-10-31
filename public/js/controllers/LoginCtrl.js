angular.module('LoginCtrl', []).controller('LoginController', function($scope) {

	$scope.credentials = {};
	$scope.credentials.email = "yourname@spiderlogic.com";
	$scope.credentials.password = "what!";
	$scope.login = function(){
		alert('Hi there!\n So I know that your email and password is:\n' + $scope.credentials.email + "\n" +  $scope.credentials.password);	
	}
	
	
});