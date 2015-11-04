(function() {
    'use strict';

    angular.module('spiderPortal')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', appRoutes]);

    function appRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'auth/login.html',
				controller: 'loginController',
				onEnter: [
					"$rootScope", '$state', function ($rootScope, $state) {
						if ($rootScope.isAuthenticated()) {
							$state.go('myfeedback');
							return;
						}
					}
				]
			})
			.state('logout', {
						url: '/logout',
						templateUrl: 'auth/login.html',
						controller: 'logoutController'
					})
			.state('myfeedback', {
				url: '/myfeedback',
				templateUrl: 'myFeedback/myFeedback.html',
				onEnter: [
					"$rootScope", '$state', function ($rootScope, $state) {
						if (!$rootScope.isAuthenticated()) {
							$state.go('login');
							return;
						}
					}
				]
			})
			.state('peerfeedback', {
				url: '/peerfeedback',
				templateUrl: 'peerFeedback/peerFeedback.html',
				onEnter: [
					"$rootScope", '$state', function ($rootScope, $state) {
						if (!$rootScope.isAuthenticated()) {
							$state.go('login');
							return;
						}
					}
				]
			})
			.state('viewFeedback', {
				url: '/viewFeedback',
				templateUrl: 'viewFeedback/viewFeedback.html',
				onEnter: [
					"$rootScope", '$state', function ($rootScope, $state) {
						if (!$rootScope.isAuthenticated()) {
							$state.go('login');
							return;
						}
					}
				]
			})
			.state('associates', {
				url: '/associates',
				templateUrl: 'associates/associates.html',
				onEnter: [
					"$rootScope", '$state', function ($rootScope, $state) {
						if (!$rootScope.isAuthenticated()) {
							$state.go('login');
							return;
						}else if(!$rootScope.isAdmin()){
							$state.go('error', {status: 403});
							return;
						}
					}
				]
			})
			.state('error', {
				url: '/error/:status',
				templateUrl: 'errors/error.html'
			});

		$urlRouterProvider.otherwise('/myfeedback');

		$locationProvider.html5Mode(false);
	};
})();
