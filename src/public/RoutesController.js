/**
 * Created by ceal on 25.08.15.
 */
app.controller("RoutesController", [ '$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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
            }
        }
    });
    //Drawing all shapes when page is loading
    $rootScope.myPromise = $http.get('api/shapes').then(function (data) {
        console.log(data);
        $scope.allShapes = data.data;
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

    });

}])