/**
 * Created by ceal on 14.08.15.
 */
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
app = expressWs.app;

app.use(express.static('./src/public'));

app.ws('/', function(ws, req){
    console.log(ws);
    console.log(req);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('viz served http://%s:%s', host, port);

});