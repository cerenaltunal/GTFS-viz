var app = angular.module('mapModule', ['leaflet-directive', 'cgBusy', 'ui.bootstrap', 'ui.router'])
.config(function($stateProvider) {
        $stateProvider.state('routes', {
            url:'/routes',
            templateUrl:'routes.html'
        })
            .state('home', {
                url:'/',
                templateUrl:'home.html'
            })
            .state('stops', {
                url:'/',
                templateUrl:'stops.html'
            })

    });