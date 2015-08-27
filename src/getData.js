/*
 * This package reads data from file and creates and JSON object for visualizing data in leaflet.js
 */
var loader = require('csv-load-sync');

/*
 * Files to read
 */
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

/*
 * Helper function to create HashMaps listing elements by an id.
 */
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

    /*
    * Creating geoJSON for stops
    */

    var stops = {};

    stops['type'] = 'FeatureCollection';
    stops['features'] = [];
    data['stops.txt'].forEach(function(stop){
        var newFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [parseFloat(stop.stop_lon), parseFloat(stop.stop_lat)]
            },
            "properties": stop
        }
        stops['features'].push(newFeature);
    });

    /*
    * Create geoJson for shapes
    */
    var shapesById = createById(data["shapes.txt"], 'shape_id');

    var shapes = {}
    shapes['type'] = 'FeatureCollection';
    shapes['features'] = [];


    for(var key in shapesById){
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

    /*
     * Create HashMaps listing elements by an id.
     */
    var routesById = createById(data["routes.txt"], 'route_id');
    var tripsByRouteId = createById(data["trips.txt"], 'route_id');
    var stop_timesByTripId = createById(data["stop_times.txt"], 'trip_id');
    var tripsById = createById(data["trips.txt"], 'trip_id');
    var stop_timesById = createById(data["stop_times.txt"], 'stop_id');
    var shapesById = createById(data["shapes.txt"], 'shape_id');
    var stopsById = createById(data["stops.txt"], 'stop_id');

    /*
     * Creation of an object that contains routes with its trips and stops
     */

    for(var routeId in routesById) {

        routesById[routeId].name = routesById[routeId].list[0].route_long_name;
        var agency_id = routesById[routeId].list[0].agency_id;

        if (tripsByRouteId[routeId]) {
            routesById[routeId].trips = tripsByRouteId[routeId].list;

            // Collect trips of the route
            routesById[routeId].trips.forEach(function(trip){
                if(stop_timesByTripId[trip.trip_id]){
                    trip.stop_times = stop_timesByTripId[trip.trip_id].list;
                    trip.stops = {
                        geojson:{
                            type: "FeatureCollection",
                            features: []
                        }
                    };

                    // Collect stop geometry and combine with stop time with using stop_id
                    trip.stopsById = {};
                    trip.stop_times.forEach(function(stop_time){
                        if(stopsById[stop_time.stop_id]){
                            var stop = trip.stopsById[stop_time.stop_id] = stopsById[stop_time.stop_id].list[0];
                            stop.feature = {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [parseFloat(stop.stop_lon), parseFloat(stop.stop_lat)]
                                }
                            };
                            trip.stops.geojson.features.push(stop.feature);
                            stop_time.stop = stop;
                        }
                    });
                    //for(var stopId in trip.stopsById){}
                }

                if(shapesById[trip.shape_id]){
                    trip.shape = {}
                    trip.shape['type'] = 'FeatureCollection';
                    trip.shape['features'] = [];
                    var newFeature = {
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        },
                        //properties: shapesById[trip.shape_id].list[0]
                        properties: agency_id
                    };

                    //Collect shapes with using shape_id for trips
                    shapesById[trip.shape_id].list.forEach(function(shape){
                        newFeature.geometry.coordinates.push([parseFloat(shape.shape_pt_lon), parseFloat(shape.shape_pt_lat)])
                    });
                    trip.shape.features.push(newFeature);
                }
            });

        }
    }

    var processed_data = {};
    processed_data.stops = stops;
    processed_data.shapes = shapes;
    processed_data.routes = routesById;
    processed_data.trips = tripsById;
    return [processed_data, stopsById, stop_timesById, shapesById];

};