/**
 * Created by ceal on 14.08.15.
 */
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
app = expressWs.app;

var getData = require('./src/getData');

var data = getData('data');

app.get('/api/stops', function(req, res){
    /*  */
    res.json(data.stops);
});

app.get('/api/shapes', function(req, res){
    /*  */
    res.json(data.shapes);
});

app.use('/lib', express.static('./bower_components'));
app.use('/', express.static('./src/public'));

app.ws('/', function(ws, req){
    console.log(ws);
    console.log(req);
});

var server = app.listen(3000, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('GTFS-viz served http://%s:%s', host, port);

});