
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

 var result = "a";   


mongoose.connect('mongodb://18.191.224.213:27017/elastiCon'); // connect to our mongoDB database (commented out after you enter in your own credentials)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to mongoDB");
})
// Connection URL
//var url = 'mongodb://dave:password@localhost:27017/myproject?authSource=admin';
// Use connect method to connect to the Server

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

var controllerSchema = mongoose.Schema({
    stats: String,
    role: String,
    id: String
  });

var controller = mongoose.model('controllers',  controllerSchema);

var MigrationInProgress = mongoose.Schema({
    status: String,
    datapath: String,
    dpid: String
});
var flagSchema = mongoose.Schema({
    MigrationEnd: String,
    MigrationStart: String,
    MigrationInProgress: [MigrationInProgress]
  });
var flag = mongoose.model('flag',  flagSchema);

var genSchema = mongoose.Schema({
    value: String,
  });
var gen_id = mongoose.model('gen_id',  genSchema);



/**
 * Mongoose Function: Controller Find
 * @return Promise
 */

 function controller_find(data) {
    return new Promise(function(resolve, reject) {
        controller.find(data, function(err, controller) {
            if(err) {
                reject(err);
            }
            resolve(controller);
        });
    });
 }


/**
 * Mongoose Function: Gen Find
 * @return Promise
 */

function gen_find(data) {
    return new Promise(function(resolve, reject) {
        gen_id.find(data, function(err, controller) {
            if(err) {
                reject(err);
            }
            resolve(controller);
        });
    });
 }


/**
 * Mongoose Function: Flag Find
 * @return Promise
 */

function flag_find(data) {
    return new Promise(function(resolve, reject) {
        flag.find(data, function(err, controller) {
            if(err) {
                reject(err);
            }
            resolve(controller);
        });
    });
 }


app.post('/api', function(req, res){
    var promise_Arr = [];
    promise_Arr[0] = controller_find({});
    promise_Arr[1] = gen_find({});
    promise_Arr[2] = flag_find({});
    Promise.all(promise_Arr).then(function(response) {
        result = response;
    }).catch(function(err) {
        console.log('erro');
        console.log(err);
    })
    res.contentType('application/json');
    res.send(JSON.stringify(result));
});
//dataChange(app, io, tutorial);

// start app ===============================================
http.listen(3000, function(){
    console.log('listening on *:3000');
  });
exports = module.exports = app; 						// expose app