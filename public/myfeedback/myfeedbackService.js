(function() {
    'use strict';

    angular.module('spiderPortal')
        .factory('myFeedbackService', ['$q', myFeedbackService]);

      function myFeedbackService($q) {
          return {
              get: get
          };

          function get(pageNo, pageSize, sortExpr, sortOrder, filters) {
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
          };
      };
  })();
