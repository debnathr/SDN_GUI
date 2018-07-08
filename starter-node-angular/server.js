// modules =================================================
var express = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var dataChange   = require('./controller/dataChange');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://18.191.224.213:27017/elastiCon';
var controllers, flags, gen_id;


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

require('./app/routes')(app); // pass our application into our routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});


app.post('/api', function(req, res){
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
         if(mongoDb.isConnected()){
            console.log('connected to MD');
        }
        assert.equal(err,null);
        controllers = db.collection("controllers").find();
        flags  = db.collection("flags").find(); 
        gen_id = db.collection("gen_id").find();
    });
    res.contentType('application/json');
    res.send(JSON.stringify({ controllers: controllers, flags:flags, gen_id:gen_id }));
});
//dataChange(app, io, tutorial);

// start app ===============================================
http.listen(3000, function(){
    console.log('listening on *:3000');
  });
exports = module.exports = app; 						// expose app