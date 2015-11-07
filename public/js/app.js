(function () {
    'use strict';

    angular.module('spiderPortal', ['ngResource', 'ngStorage', 'ui.router', 'ui.bootstrap']);

    angular.module('spiderPortal')
      .config(['$httpProvider', spiderPortal]);

    function spiderPortal($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
  })();
