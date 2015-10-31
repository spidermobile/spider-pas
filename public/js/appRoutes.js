angular.module('appRoutes', []).config(['$stateProvider', '$urlRouteProvider', function($stateProvider, $urlRouteProvider) {

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

	$urlRouteProvider.otherwise('/');

}]);
