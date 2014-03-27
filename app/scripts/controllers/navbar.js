define(['angular'], function (angular) {
  'use strict';

  angular.module('generatorAngularFullstack2App')
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