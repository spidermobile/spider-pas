/**
 * Created by asheesh on 31/10/2015.
 */
(function () {
    'use strict';
    angular.module('spiderPortal').service('utils', utils);

    function utils() {
        return {
            initRootScope: function utils($rootScope, associateService, $state) {
                $rootScope.isAuthenticated  = function (){
                    return associateService.getLoggedUser();
                }

                $rootScope.setTextAreaHeight = function (textarea) {
                    $(textarea).css("height", (textarea.scrollHeight - 22) + "px");
                    var currentHeight = textarea.scrollHeight - 2;
                    $(textarea).css("height", currentHeight + "px");
                };
            }
        }
    }

    angular.module('spiderPortal')
        .run(['utils', '$rootScope', 'associateService', '$state', run]);

    function run(utils, $rootScope, associateService, $state) {
        utils.initRootScope($rootScope, associateService, $state);
    };
})();
