/**
 * Created by asheesh on 04/11/2015.
 */
(function() {
    "use strict";
    angular.module("spiderPortal")
        .factory("authInterceptor", ["$q", '$rootScope', authInterceptor]);

    function authInterceptor($q, $rootScope) {
        return {
            request: function(config) {
                var user = $rootScope.currentUser();
                config.headers["x-access-token"] = user ? user.token : "";
                return config || $q.when(config);
            }
        };
    }
})();
