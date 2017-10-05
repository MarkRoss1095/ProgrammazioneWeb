    
    
    // import moduli node ========================
var express  = require('express');
var app      = express(); 


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


// listen (start app with node server.js) ======================================
    app.listen(8080,()=>{
        console.log('server on su http://lochalhost:' + 8080);
    })

