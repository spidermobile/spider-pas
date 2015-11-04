/**
 * Created by asheesh on 04/11/2015.
 */
(function() {
    "use strict";
    angular.module("spiderPortal")
        .factory("tokenInterceptor", ["$q", '$rootScope', tokenInterceptor]);

    function tokenInterceptor($q, $rootScope) {
        return {
            request: function(config) {
                config.headers["x-access-token"] = $rootScope.loggedUser ? $rootScope.loggedUser.token : "";
                return config || $q.when(config);
            }
        };
    }
})();