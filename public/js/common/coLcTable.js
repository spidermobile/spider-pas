(function() {
    'use strict';

    angular.module('spiderPortal')
        .directive('coLcTable', [coLcTable]);

    function coLcTable() {
      return {
          restrict: 'E',
          replace: true,
          templateUrl: 'js/common/coLcTable.html',
          scope: {
              tableOpt: "=tableoptions",
              dataFunction: "=datafunction",
              sharedData: "=sharedData",
              hideLoading: "=",
              showLoading: "="
          },
          controller: ['$scope', '$timeout', '$rootScope', function ($scope, $timeout, $rootScope) {
              $scope.rows = [];
              $scope.sharedData.rows = [];
              $scope.tableOptions = {
                  showPagination: true,
                  searchRow: false,
                  pageSize: 8,
                  maxPageControls: 4,
                  currentPage: 1,
                  sortExpression: "",
                  sortOrder: "asc",
                  columnDefs: []
              };

              angular.extend($scope.tableOptions, $scope.tableOpt);
              angular.forEach($scope.tableOptions.columnDefs, function (column, index) {
                  if (column.search) {
                      $scope.tableOptions.searchRow = true;
                      return false;
                  }
              });

              $scope.findByPage = function (page, sortExpr, sortOrder, filters) {
                  $scope.showLoading();
                  $scope.dataFunction.get(page, $scope.tableOptions.pageSize, sortExpr, sortOrder, filters).then(function (data) {
                      $scope.hideLoading();
                      $scope.sharedData.rows = $scope.rows = data.items;
                      $scope.totalItemCount = data.itemsCount;
                      $scope.sharedData.showTable = !data.noItems;
                      $scope.sharedData.showMessage = data.noItems;
                      if (data.errorMsg) {
                          $scope.sharedData.errorMsg = data.errorMsg;
                      }
                      $timeout(function () {
                          $rootScope.$broadcast('tableDataLoaded', $scope.tableOptions.id);
                      }, 0);
                  }, function (reason) {
                      $scope.hideLoading();
                      alert('Failed: ' + reason);
                  }, function (update) {
                      alert('Got notification: ' + update);
                  });
              };

              $scope.sort = function (sortExpr) {
                  if ($scope.tableOptions.sortExpression != sortExpr) {
                      $scope.tableOptions.sortOrder = 'asc';
                  } else {
                      if ($scope.tableOptions.sortOrder == 'asc') {
                          $scope.tableOptions.sortOrder = 'desc';
                      } else {
                          $scope.tableOptions.sortOrder = 'asc';
                      }
                  }
                  $scope.tableOptions.sortExpression = sortExpr;
                  var filters = {};
                  angular.extend(filters, $scope.sharedData.search);
                  if ($scope.rows.length > 0) {
                      $scope.findByPage($scope.tableOptions.currentPage, $scope.tableOptions.sortExpression, $scope.tableOptions.sortOrder, filters);
                  }
              };
              $scope.previousFilters = {};
              $scope.filter = function (event) {
                  var filters = {};
                  angular.extend(filters, $scope.sharedData.search);
                  if (!angular.equals(filters, $scope.previousFilters)) {
                      if (angular.isUndefined(event)) {
                          angular.copy(filters, $scope.previousFilters);
                          $scope.findByPage($scope.tableOptions.currentPage, $scope.tableOptions.sortExpression, $scope.tableOptions.sortOrder, filters);
                      } else {
                          if (event.which == 13 || event.type == "blur") {
                              angular.copy(filters, $scope.previousFilters);
                              $scope.findByPage($scope.tableOptions.currentPage, $scope.tableOptions.sortExpression, $scope.tableOptions.sortOrder, filters);
                          }
                      }
                  }

              };

              $scope.pageChanged = function (pageNo) {
                  $scope.setPage(pageNo);
                  var filters = {};
                  angular.extend(filters, $scope.sharedData.search);
                  $scope.findByPage(pageNo, $scope.tableOptions.sortExpression, $scope.tableOptions.sortOrder, filters);
              };
              $scope.itemsPerPage = $scope.tableOptions.pageSize;
              $scope.setPage = function (pageNo) {
                  $scope.tableOptions.currentPage = pageNo;
                  $scope.tableOpt.currentPage = pageNo;
              };

              $scope.$on('reloadTable', function (event, tableId) {
                  if (tableId == $scope.tableOptions.id) {
                      reloadTable();
                  }
              });

              $scope.$on('changeTablePage', function (event, tableId, page) {
                  if (tableId == $scope.tableOptions.id) {
                      $scope.pageChanged(page);
                  }
              });

              var reloadTable = function () {
                  var filters = {};
                  angular.extend(filters, $scope.sharedData.search);
                  $scope.findByPage($scope.tableOptions.currentPage, $scope.tableOptions.sortExpression, $scope.tableOptions.sortOrder, filters);
              };

              //$timeout(function () {
              //    if ($scope.tableOptions.autoLoad === true) {
              //        reloadTable();
              //    }
              //}, 0);

              $timeout(function () {
                  if ($scope.tableOptions.autoLoad === true) {
                      $scope.setPage($scope.tableOpt.currentPage);
                      reloadTable();
                  }
                  angular.forEach(angular.element(".pagination li:not(.disabled) a"), function (elem) {
                      $(elem).attr("tabindex", "0");
                  });

              });
          }]
      };
  };
})();
