describe('angular Tests:', function() {

    var $controller, $rootScope, $scope, $httpBackend;

    beforeEach(function(){
        module('mapModule');
    });

    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    describe('RoutesController', function(){
        var shapes = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [parseFloat('-99.14896131'), parseFloat('19.42726839')]
                    },
                    properties: {
                        stop_id: 'Balderas',
                        stop_code: '',
                        stop_name: 'Balderas',
                        stop_desc: 'Parent station metro',
                        stop_lat: '19.42726839',
                        stop_lon: '-99.14896131',
                        zone_id: '',
                        stop_url: '',
                        location_type: '1',
                        parent_station: '',
                        wheelchair_boarding: '',
                        stop_direction: ''
                    }
                }
            ]
        };

        beforeEach(function(){
            $scope = $rootScope.$new();
            $controller('RoutesController', {$scope: $scope});
            $httpBackend.expectGET('api/shapes').respond(shapes);
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should set shapes to proper scope object', function(){
            $httpBackend.flush();
            expect($scope.shapes.data).toEqual(shapes);
        });

    });

    describe('TripsController', function(){
        var stops = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [parseFloat('-99.14896131'), parseFloat('19.42726839')]
                    },
                    properties: {
                        stop_id: 'Balderas',
                        stop_code: '',
                        stop_name: 'Balderas',
                        stop_desc: 'Parent station metro',
                        stop_lat: '19.42726839',
                        stop_lon: '-99.14896131',
                        zone_id: '',
                        stop_url: '',
                        location_type: '1',
                        parent_station: '',
                        wheelchair_boarding: '',
                        stop_direction: ''
                    }
                }
            ]
        };

        beforeEach(function(){
            $scope = $rootScope.$new();
            $controller('TripsController', {$scope: $scope});
            $httpBackend.expectGET('api/routes').respond({});
            $httpBackend.expectGET('api/stops').respond(stops);
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should process stops and put as markers', function(){
            $httpBackend.flush();
            expect($scope.markers).toEqual([{layer: 'markers', lat: 19.42726839, lng: -99.14896131}])
        });

    });

    describe('StopsController', function(){
        it('is left untested, always passes', function(){
            expect(true).toBe(true);
        })
    });

});