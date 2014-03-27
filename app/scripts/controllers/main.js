define(['angular'], function (angular) {
  'use strict';

  angular.module('generatorAngularFullstack2App.controllers.MainCtrl', [])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/api/awesomeThings').success(function (awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    }]);
});