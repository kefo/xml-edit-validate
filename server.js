// imports
var http = require('http'),
    path = require('path'),
    express = require('express');

// establish server
var express = require('express');
var server = express();

// configure application
server.configure(function () {
  server.set('views', __dirname + '/views');
  server.set('view engine', 'jade');
});

server.configure('development', function () {
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  server.use(express.static(__dirname + '/public_html'));
});

server.configure('production', function () {
  server.use(express.errorHandler());
  server.use(express.static(__dirname + '/public_html', {maxAge: 60*15*1000}));
});

server.get('/', function (req, res){
  res.render('index', {
    title: 'XML Edit and Validate'
  });
});

server.get('/about/', function (req, res){
  res.render('about', {
    title: 'about xml edit and validate'
  });
});

server.listen(3001);
console.log('Server started; Listening on port 3001');
