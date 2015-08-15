var loader = require('csv-load-sync');

var files = [
    "agency.txt",
    "calendar.txt",
    "calendar_dates.txt",
    "feed_info.txt",
    "frequencies.txt",
    "routes.txt",
    "shapes.txt",
    "stop_times.txt",
    "stops.txt",
    "transfers.txt",
    "trips.txt"
];


function createById(list, idName){
    var itemById = {};
    list.forEach(function(item){
        var itemId = item[idName];
        if(!itemById[itemId]){
            itemById[itemId] = {list: []};
        }
        itemById[itemId].list.push(item);
    });
    return itemById;
}

module.exports = function(folder){
    var data = {};

    files.forEach(function(file){
        data[file] = loader(folder + '/' + file);
    });

    var stops = {};
    stops['type'] = 'FeatureCollection';
    stops['features'] = [];
    //Create geoJSON for stops
    data['stops.txt'].forEach(function(stop){
        var newFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [parseFloat(stop.stop_lon), parseFloat(stop.stop_lat)]
            },
            "properties": stop
        }
        delete newFeature.properties.stop_lon;
        delete newFeature.properties.stop_lat;
//        newFeature.properties["marker-size"]="large";
//        newFeature.properties["marker-color"]="#4682b4";
//        newFeature.properties["marker-symbol"]="";
        stops['features'].push(newFeature);
    });

    var routesById = createById(data["routes.txt"], 'route_id');

    var tripsById = createById(data["trips.txt"], 'trip_id');


    //Create geoJson fro shapes.txt
    var shapes = {}
    shapes['type'] = 'FeatureCollection';
    shapes['features'] = [];

    var shapesById = createById(data["shapes.txt"], 'shape_id');

    for(key in shapesById){
        var newFeature = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [],
                properties: shapesById[key].list[0]
            }
        };
        shapesById[key].list.forEach(function(shape){
            newFeature.geometry.coordinates.push([parseFloat(shape.shape_pt_lon), parseFloat(shape.shape_pt_lat)])
        });
        shapes.features.push(newFeature);
    }

    geojson = [];
    geojson['stops'] = stops;
    geojson['shapes'] = shapes;
    return geojson;

};