define(['angular', 'controllers/main'], function (angular) {
  'use strict';
  return angular.module('primediser', [
    'primediser.controllers.MainCtrl',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
    .config(['$routeProvider', '$locationProvider',
             function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/main',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }]);
});