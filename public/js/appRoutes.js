(function() {
    'use strict';

    angular.module('spiderPortal')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', appRoutes]);

    function appRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'myFeedback/myFeedback.html'
				})
				.state('login', {
					url: '/login',
					templateUrl: 'auth/login.html',
					controller: 'loginController'
				})
        .state('logout', {
					url: '/logout',
					templateUrl: 'auth/login.html',
					controller: 'logoutController'
				})
				.state('myfeedback', {
					url: '/myfeedback',
					templateUrl: 'myFeedback/myFeedback.html'
				})
        .state('peerfeedback', {
					url: '/peerfeedback',
					templateUrl: 'peerFeedback/peerFeedback.html'
				})
        .state('associates', {
					url: '/associates',
					templateUrl: 'associates/associates.html'
				})

			$urlRouterProvider.otherwise('/');

			$locationProvider.html5Mode(true);
		};
})();
