    
    
    // import moduli node ========================
var express  = require('express');
var app      = express(); 
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)


// configuration =================

var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/ProgrammazioneWeb');
var con = mongoose.connection;
con.on('error', function (err){
    console.log('errore di connessione', err);
});

con.once('open', function (){
console.log('connessione al database neoscan riuscita!');
});


app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// routes ======================================================================
app.use(require('./server/routes.js'));

// listen (start app with node server.js) ======================================
    app.listen(8080,()=>{
        console.log('server on su http://lochalhost:' + 8080);
    })

