angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.state('nerds', {
			url: '/nerds',
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.state('geeks', {
			url: '/geeks',
			templateUrl: 'views/geek.html',
			controller: 'GeekController'
		})

	$urlRouterProvider.otherwise('/');

}]);
