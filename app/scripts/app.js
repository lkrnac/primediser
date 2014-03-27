define(['angular', 'controllers/main'], function (angular, MainCtrl) {
  'use strict';
  return angular.module('generatorAngularFullstack2App', [
    'generatorAngularFullstack2App.controllers.MainCtrl',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
    .config(function ($routeProvider, $locationProvider) {
      debugger;
      $routeProvider
        .when('/', {
          templateUrl: 'partials/main',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    });
});