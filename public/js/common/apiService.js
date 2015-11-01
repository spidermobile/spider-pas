/**
 * Created by asheesh on 01/11/2015.
 */
(function() {
    "use strict";

    angular.module("spiderPortal")
        .factory("apiService", ["apiBaseUrl", apiService]);

    function apiService(apiBaseUrl) {
        return {
            baseUrl: function() {
                return apiBaseUrl;
            },
            resolveUrl: function(urlSegment) {
                return apiBaseUrl + urlSegment;
            }
        };
    }
})();