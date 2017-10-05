    
    
    // import moduli node ========================
var express  = require('express');
var app      = express(); 
var routes = require('./routes/index');
var admin = require('./routes/admin');
var prof = require('./routes/prof');
var student = require('./routes/student');                         // create our app w/ express


// configuration =================

var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/ProgrammazioneWeb');
var con = mongoose.connection;
con.on('error', function (err){
    console.log('errore di connessione', err);
});

con.once('open', function (){
console.log('connessione al database riuscita!');
});
// importato passport per l'autenticazione dell'utente ed express-session per la sessione dell'utente.
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretKey',
                        resave: true,
                        saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// listen (start app with node server.js) ======================================
    app.listen(8080,()=>{
        console.log('server on su http://lochalhost:' + 8080);
    })

    //settate le routes
app.use('/', routes);
app.use('/paginaAmministratore', admin);
app.use('/paginaDocente', prof);
app.use('/paginaStudente', student);
