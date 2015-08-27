var getData = require('../../src/getData');

var values = [{ stops : { type : 'FeatureCollection', features : [  ] }, shapes : { type : 'FeatureCollection', features : [  ] }, routes : {  }, trips : {  } },{},{},{}];

describe('API tests:', function() {
    it('should give proper return values', function(){
        expect(getData('test/data')[0]).toBeDefined();
        expect(getData('test/data')[0].stops).toBeDefined();
        expect(getData('test/data')[0].shapes).toBeDefined();
        expect(getData('test/data')[0].routes).toBeDefined();
        expect(getData('test/data')[0].trips).toBeDefined();
        expect(getData('test/data')[1]).toBeDefined();
        expect(getData('test/data')[2]).toBeDefined();
        expect(getData('test/data')[3]).toBeDefined();
    });


    it('should give correct stops', function() {
        expect(getData('test/data')[0].stops)
            .toEqual({
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
        });
    });
});
