/* require('dotenv').config();

//import module 
var express  = require('express');
var app = express(); 
var bodyParser = require('body-parser');

/* var port = process.env.PORT || 8080; 
app.use(express.static(__dirname + '/client'));     


//connect to the database mongoose
var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/ProgrammazioneWeb');
var connect = mongoose.connection;

connect.once('open', function (){
    //message on the terminal: connection is ON
console.log('*    Server connection is Up!      *');
console.log('************************************')
});
connect.on('error', function (err){
    //if there is an error while connection
    console.log('++++    errore di connessione   +++++', err);
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));    
// parse application/json        
app.use(bodyParser.json());            
// parse application/vnd.api+json as json                         
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

//app.use(express.static(__dirname + '/client')); 

// routes for server file 
app.use(require('./server/routes.js'));

// listen (start app with node server.js) 
/*     app.listen(port,function(){
        console.log('Our app is running on http://localhost:' + port);    })

 
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  }); */

  // server.js

//load enviroment vairiables
require('dotenv').config();

// import moduli node ========================
var express  = require('express');
var multer	=	require('multer');
var app      = express();                          // create our app w/ express
var mongoose = require('mongoose');                 // mongoose for mongodb
var morgan =   require('morgan');                   // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)
var port =       process.env.PORT; 
var passport= require('passport');
var logger = require("./server/config/logger");
var fs = require('fs');

// configuration =================

mongoose.connect(process.env.DB_URI);           // connect to mongoDB database on .evi file.

app.use(passport.initialize());
app.use(express.static(__dirname + '/client/www'));             // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
app.use(require('./server/routes.js'));




var port = process.env.PORT || 8000

// listen (start app with node server.js) ======================================
server.listen(port, function() {
    console.log("App is running on port " + port);
});