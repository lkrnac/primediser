define(['angular'], function (angular) {
  'use strict';

  angular.module('primediser')
    .controller('NavbarCtrl', function ($scope, $location) {
      $scope.menu = [{
        'title': 'Home',
        'link': '/'
      }];

      $scope.isActive = function (route) {
        return route === $location.path();
      };
    });
});