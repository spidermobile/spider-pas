/**
 * Created by asheesh on 31/10/2015.
 */
'use strict';

angular.module('services', []).factory('myFeedbackService', ['$q', function ($q) {
    return {
        get: function (pageNo, pageSize, sortExpr, sortOrder, filters) {
            var deferred = $q.defer();
            var response = {
                items: [
                    {name: "Asheesh", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Gaurav", status: "Approved", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Pending", dueDate: "jgfkjsd"},
                    {name: "Nikhil", status: "Approved", dueDate: "jgfkjsd"}
                ],
                itemsCount: 0,
                noItems: false
            };
            deferred.resolve(response);
            return deferred.promise;
        }
    };
}]);
