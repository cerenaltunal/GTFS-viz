/**
 * Created by ceal on 14.08.15.
 */
var express = require('express');
var app = express();

var getData = require('./src/getData');
/*
* Get the data-set for RestAPI end point
*/
var data = getData('data');
var tripsById =data[0].trips;
var shapes = data[0].shapes;
var stops = data[1];
var stop_timesById = data[2];
var shapesById = data[3];
    data = data[0];

app.get('/api/stops', function(req, res){
    /*  */
    res.json(data.stops);
});

app.get('/api/shapes', function(req, res){
    /*  */
    res.json(shapes);
});
app.get('/api/stops/:id', function(req, res){
    /*  */
     res.json(stops[req.params.id]);
});

/*
 * The created RestAPI end point serves routes that contains selected stop.
 */

app.get('/api/routes', function(req, res){
    if(!req.query.by)
        res.json(data.routes);
    else{
        switch(req.query.by){
            case 'stop':
            {
                var matchTripId = [];
                var matchRouteId = [];
                var matchRoutesShapes = [];
                //get the trips which has the selected stops
                if(stop_timesById[req.query.id]){
                    stop_timesById[req.query.id].list.forEach(function (element) {
                        matchTripId.push(element.trip_id);
                    });
                //get the routes which has the obtained trips
                    matchTripId.forEach(function(tripId){
                        tripsById[tripId].list.forEach(function(trip){
                            if(matchRouteId.indexOf(trip.route_id) == -1){
                                matchRouteId.push(trip.route_id);
                            }
                        })
                    });
                //get shape of the route
                    matchRouteId.forEach(function(routeId){
                        var shapeArray = [];
                        data.routes[routeId].trips.forEach(function(element){
                            if(shapeArray.indexOf(shapesById[element.shape_id]) == -1)
                                shapeArray.push(shapesById[element.shape_id]);

                        });
                        var routeObject ={};
                        routeObject[routeId] = shapeArray;
                        matchRoutesShapes.push(routeObject);
                    });
                    res.json(matchRoutesShapes);

                }else{
                    res.send(404,'Stop not found');
                }

               break;
            }
                //Some additional case can be added for the RestAPI
            case 'agency':
            {
                /*Code for query by agency*/
                res.json({}); break;
            }
            default: res.send(404, 'not found'); break;
        }
    }
});
//serve Routes with route_id
app.get('/api/routes/:id', function(req, res){
    /*  */
    res.json(data.routes[req.params.id]);
});
app.get('/api/trips', function(req, res){
    /*  */
    res.json(data.routes);
});
app.use('/lib', express.static('./bower_components'));
app.use('/', express.static('./src/public'));

var server = app.listen(3000, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('GTFS-viz served http://%s:%s', host, port);

});