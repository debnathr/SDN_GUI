// modules =================================================
var express = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var dataChange   = require('./controller/dataChange');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');



mongoose.connect('mongodb://127.0.0.1:27017/test'); // connect to our mongoDB database (commented out after you enter in your own credentials)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to mongoDB");
})


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

io.on('connection', function(client){
    console.log("we are connected to sockets");
});

var tutorialspointSchema = mongoose.Schema({
    name: String
  });

var tutorial = mongoose.model('tutorialspoint',  tutorialspointSchema);

var silence = new tutorial({ name: 'Silence' });
silence.save(function (err, silence) {
    if (err) return console.error(err);
  });
console.log(silence.name);

//dataChange(app, io, tutorial);

// start app ===============================================
http.listen(3000, function(){
    console.log('listening on *:3000');
  });
exports = module.exports = app; 						// expose app