/* jslint node: true */
'use strict'
var express = require('express')
var morgan = require('morgan') // For Loggin
var path = require('path')
var bodyParser = require('body-parser')
// Require configuration file defined in app/Config.js
var config = require('./utils/Config')
// Express 
var app = express() // Initisalize
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Inistalize Server 

const port = config.APP_PORT || 9090


					// 
app.listen(port)								 // Listen on port defined in config file
console.log('App listening on port ' + port)


// Router Initialisaiton / Controllers 


var taskRoutes = require('./controllers/taskFunctions')
//  Use routes defined in Route.js and prefix with todo
// app.use('/order/',orderRoutes)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})
app.use('/tasks', taskRoutes)


var mongoose = require('mongoose')


// Connect to database
mongoose.connect(config.DB)
// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/public')))
// Use morgan to log request in dev mode
// app.listen(port)								 // Listen on port defined in config file

// Server index.html page when request to the root is made




// App.listen - Backstage
// const http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(8080, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:8080/');