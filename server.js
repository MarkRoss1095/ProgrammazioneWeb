require('dotenv').config();

//import module 
var express  = require('express');
var app      = express(); 
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)


//connect to the database mongoose

var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/ProgrammazioneWeb');
var connect = mongoose.connection;


connect.once('open', function (){
    //message on the terminal, connection is ON
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

app.use(express.static(__dirname + '/client')); 


// routes for server file 
app.use(require('./server/routes.js'));

// listen (start app with node server.js) 
    app.listen(8080,()=>{
        console.log('************************************')
        console.log('*Server on at http://localhost:' + 8080+'*');
    })

