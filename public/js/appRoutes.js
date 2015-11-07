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
				onEnter: ["$rootScope", '$state', function ($rootScope, $state) {
						if ($rootScope.isAuthenticated()) {
							$state.go('myfeedback');
            }
					}]
			})
			.state('logout', {
				url: '/logout',
				templateUrl: 'auth/login.html',
				controller: 'logoutController',
        requireLogin: true
			})
			.state('myfeedback', {
				url: '/myfeedback',
				templateUrl: 'myFeedback/myFeedback.html',
        requireLogin: true
			})
			.state('peerfeedback', {
				url: '/peerfeedback',
				templateUrl: 'peerFeedback/peerFeedback.html',
        requireLogin: true
			})
			.state('viewFeedback', {
				url: '/viewFeedback',
				templateUrl: 'viewFeedback/viewFeedback.html',
        requireLogin: true
			})
			.state('associates', {
				url: '/associates',
				templateUrl: 'associates/associates.html',
        requireLogin: true,
        requireAdmin: true
			})
			.state('error', {
				url: '/error/:status',
				templateUrl: 'errors/error.html',
        requireLogin: false
			});

		$urlRouterProvider.otherwise('/myfeedback');

		$locationProvider.html5Mode(false);
	};
})();
