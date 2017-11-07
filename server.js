var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./server/routes/web');
var apiRoutes = require('./server/routes/api');
var connection = require('./server/config/db');

//creating app
var app = express();

//get all the data from body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//coustem files
app.use(express.static(path.join(__dirname,'app')));
app.use(express.static(path.join(__dirname,'server/services')));
app.use(express.static(path.join(__dirname,'server/controllers')));

//base files
app.use(express.static('node_modules'));
app.use(express.static('server'));

//routes
app.use('/',routes);
app.use('/api',apiRoutes);

var port = process.env.port||3001;

//start server
app.listen(port,function() {
	 console.log("Server is running at : http://localhost:" + port);
})