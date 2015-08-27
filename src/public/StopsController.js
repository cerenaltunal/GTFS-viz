/**
 * Created by ceal on 25.08.15.
 */
/**
 * Created by ceal on 25.08.15.
 */

app.controller("StopsController", [ '$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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
                    visible: false
                }
            }
        }
    });

    $rootScope.myPromise = $http.get('api/stops').then(function(data){

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
        //$scope.markers = addressPointsToMarkers($scope.stops.data.features);
    });
    $scope.getRouteByStop =function(stopId){

        $http({
            url: 'api/routes',
            method: 'get',
            params: {
                by: 'stop',
                id: stopId
            }
        })
            .then(function(data) {

                $scope.markers = [{layer: 'markers', lat: parseFloat($scope.byStop.properties.stop_lat), lng: parseFloat($scope.byStop.properties.stop_lon) }];


                var shapes = {
                    type: 'FeatureCollection',
                    features: []
                };

                data.data.forEach(function(route){
                    for(var routeId in route){
                        route[routeId].forEach(function(shape){
                            var newFeature = {
                                type: "Feature",
                                geometry: {
                                    type: "LineString",
                                    coordinates: [],
                                    properties: []
                                }
                            };
                            shape.list.forEach(function(object){
                                newFeature.geometry.coordinates.push([parseFloat(object.shape_pt_lon), parseFloat(object.shape_pt_lat)]);
                            });

                            shapes.features.push(newFeature);
                        })};
                    $scope.shapes = {
                        data : shapes,
                        style: {
                            fillColor: "red",
                            weight: 2,
                            opacity: 1,
                            color: 'red',
                            dashArray: '3',
                            fillOpacity: 0.7
                        }
                    };
                });
            })
    }
}])
