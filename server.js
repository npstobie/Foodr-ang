var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = 3000,
    foodController = require('./server/controllers/food-controller.js'),
    placesController = require('./server/controllers/places-search.js'),
	dotenv = require('dotenv');

	dotenv.load();

// mongoose.connect('mongodb://localhost:27017/foodr-mvp');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/food', foodController.list);

app.post('/location', placesController.find);

app.post('/currentLocation', placesController.details);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});