(function () {
    'use strict';

    angular.module('spiderPortal', ['ngResource', 'ui.router', 'ui.bootstrap'])
    .config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.interceptors.push("tokenInterceptor");
        }
    ])
  })();
