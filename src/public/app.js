var app = angular.module('mapModule', ['leaflet-directive']);

app.controller("SimpleMapController", [ '$scope', '$http', function($scope, $http) {
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        },
        mexico: {lat: 19.434167, lng: -99.1333, zoom: 12},
        events: {
            map: {
                enable: ['moveend', 'popupopen'],
                logic: 'emit'
            },
            marker: {
                enable: [],
                logic: 'emit'
            }
        },
        layers: {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            },
            overlays: {
                realworld: {
                    name: "Real world data",
                    type: "markercluster",
                    visible: true
                }
            }
        }
    });

    var addressPointsToMarkers = function(points) {
        return points.map(function(ap) {
            return {
                layer: 'realworld',
                lat: ap.geometry.coordinates[1],
                lng: ap.geometry.coordinates[0]
            };
        });
    };

    $http.get('api/stops').then(function(data){
        $scope.stops = {
            data: data.data,
            style: {
                fillColor: "red",
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        };

        $scope.markers = addressPointsToMarkers($scope.stops.data.features);
    });

    $http.get('api/shapes').then(function(data){
        $scope.shapes = {
            data: data.data,
            style: {
                fillColor: "red",
                weight: 2,
                opacity: 1,
                color: 'red',
                dashArray: '3',
                fillOpacity: 0.7
            }
        };
    })

}]);