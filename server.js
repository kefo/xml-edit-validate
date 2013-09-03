// imports
var http = require('http'),
    path = require('path'),
    express = require('express'),
    libxmljs = require('libxmljs');

// establish server
var express = require('express');
var server = express();

// configure application
server.configure(function () {
  server.set('views', __dirname + '/views');
  server.set('view engine', 'jade');
  server.use(express.bodyParser());
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

server.post('/validate.php', function(req, res) {
	
    console.log(req.body.xsdData);
	
	var xmlstr = req.body.xmlData,
		xsdstr = req.body.xsdData;
		
	var xmlDoc = libxmljs.parseXmlString(xmlstr);
	var xsdDoc = libxmljs.parseXmlString(xsdstr);

    var result = xmlDoc.validate(xsdDoc);
    console.log("result:", result);

});

server.get('/getschema.php', function (req, res){
	console.log("Entered Get Schema function.");
	var sname = req.query.schemaLoc;
	
	var response = {};
	response.schemaLoc = sname;
	response.error = false;
	
	http.get(sname, function(getres) {
        var responseData= "";
        
        console.log("statusCode: ", getres.statusCode);
        console.log("headers: ", getres.headers);

        getres.on('data', function(d) {
            responseData += d;
        });
        
        getres.on('end', function(){
            response.statusCode = getres.statusCode;
            response.headers = getres.headers;
            response.content = responseData;
            res.send(response);
        });

    }).on('error', function(e) {
        response.error = true;
        response.message = e;
        console.error(e);
        res.send(response);
    });
    
	
	/*
	var options = {
        host: 'www.google.com',
        port: 80,
        path: '/index.html'
    };

    http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);
        res.on("data", function(chunk) {
                console.log("BODY: " + chunk);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    });
    */
});

server.get('/about/', function (req, res){
  res.render('about', {
    title: 'about xml edit and validate'
  });
});

server.listen(3001);
console.log('Server started; Listening on port 3001');
