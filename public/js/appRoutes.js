angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html'
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
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})

	$urlRouterProvider.otherwise('/');
}]);
