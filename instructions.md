# Instructions
Read here how to install and run the example app.

### Requirements
You need to have [Node.js](https://nodejs.org/) and npm (which is bundled with node) in current versions installed. The app is implemented for googles chrome browser, but should also run in any other modern browser.

### Installation
* clone the repository
* change to the folder you cloned to
* run `npm install`
* run `bower install`
* if you want, run the tests with `npm run test`, but they are not testing much, they are meant as a proof of concept for the testing environment
* run the web server with `node app.js`

### Use of web app
There are 3 views.
* the first one initially shows all stops as markers on a map, it also allows you to show a trip with its shape and stops
* the second one shows all shapes on the map
* the third one allows you to query routes by chosing a stop, it then draws the stop and the routes which contain this stop
The first and second view use preprocessed data which still is transformed on the client. The third view querys an api endpoint which then runs a query algorithm the data on server.