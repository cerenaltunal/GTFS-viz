/**
 * Created by ceal on 25.08.15.
 */
app.controller("TripsController", [ '$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        },
        mexico: {lat: 19.434167, lng: -99.1333, zoom: 12},
        layers: {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            },
            overlays: {
                markers: {
                    name: "stops",
                    type: "markercluster",
                    visible: true
                }
            }
        }
    });

    var addressPointsToMarkers = function(points) {
        return points.map(function(ap) {
            return {
                layer: 'markers',
                lat: ap.geometry.coordinates[1],
                lng: ap.geometry.coordinates[0]
            };
        });
    };

    /* needed to provide the <select> with options */
    $rootScope.myPromise = $http.get('api/routes').then(function(data){
        $scope.routes = data.data;
    });

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
    $scope.showRoute = function(myElement){

        $scope.shapes = {
            data: $scope.route.trips[myElement].shape,
            style: {
                fillColor: "red",
                weight: 4,
                opacity: 1,
                color: 'red',
                dashArray: '3',
                fillOpacity: 0.7
            }
        };

        $scope.markers = addressPointsToMarkers($scope.route.trips[myElement].stops.geojson.features);
        $scope.legend= {
            position: 'bottomleft',
                colors: [ '#ff0000'],
                labels: [$scope.shapes.data.features[0].properties]
        };
    };
    //Clearing the shapes on the map
    $scope.clear = function(){
        delete $scope.trip;
        delete $scope.route;
        delete $scope.legend;
        $scope.markers = addressPointsToMarkers($scope.stops.data.features);
        $scope.shapes = {
            data: $scope.allShapes,
            style: {
                fillColor: "red",
                weight: 2,
                opacity: 1,
                color: 'red',
                dashArray: '3',
                fillOpacity: 0.7
            }
        };

    };
}]);