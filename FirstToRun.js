
//script per popolare il database

var Facolta = require('./server/models/facolta');
var Admin = require('./server/models/admin');
var Prof = require('./server/models/professore'); 
var Student = require ('./server/models/student');
var ExamPassed =require('./server/models/esamisvolti')
var Corsi = require('./server/models/corsi');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/ProgrammazioneWeb";


/* // FUNZIONE PER CANCELLARE UNA COLLEZIONE
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("facoltas").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
}); */

// FUNZIONE PER CONNETTERE IL DB

mongoose.connect(url);
var con = mongoose.connection;
con.on('error', function (err){
   console.log('errore di connessione', err);
});

con.once('open', function (){
console.log('connessione al database TEST riuscita!');
});

/**Funzione per criptare la password nel db */
var bCrypt = require('bcrypt-nodejs');
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//AGGIUNTE FACOLTA'
var informatica = new Facolta({
    nome: 'Informatica',
    codFacolta: 'L31',
    corsi:  [
        {
            nome: 'Programmazione',
            codice: 'I-01',
            codFacolta: 'L31' ,
            usernameProf: 'marcello.rosati',
            cfu: 12,
            anno: 1
        },
        {
            nome: 'Analisi I',
            codice: 'I-02',
            codFacolta: 'L31',
            usernameProf: 'marcello.rosati',
            cfu: 6,
            anno: 1
        },
        {
            nome: 'Logica Matematica',
            codice: 'I-03',
            codFacolta: 'L31',
            usernameProf: 'marcello.rosati',
            cfu: 6,
            anno: 1
        },
        {
            nome: 'Lingua Inglese (B1 or B2 level)',
            codice: 'I-04',
            codFacolta: 'L31',
            usernameProf: 'marcello.rosati',
            cfu: 6,
            anno: 1
        },
        {
            nome: 'Algebra Lineare',
            codice: 'I-05',
            codFacolta: 'L31',
            usernameProf: '',
            cfu: 6,
            anno: 1
    },
    {
        nome: 'Architettura degli Elaboratori',
        codice: 'I-06',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 12,
        anno: 1
    },
    {
        nome: 'Diritto delle Nuove Tecnologie',
        codice: 'I-07',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 6,
        anno: 1
    },
    {
        nome: 'Fondamenti di Informatica',
        codice: 'I-08',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 6,
        anno: 1
    },
    {
        nome: 'Algoritmi e Strutture Dati',
        codice: 'I-09',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 12,
        anno: 2
    },
    {
        nome: 'Programmazione II',
        codice: 'I-10',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 9,
        anno: 2
    },
    {
        nome: 'Basi di Dati',
        codice: 'I-11',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 9,
        anno: 2
    },
    {
        nome: 'Internet Reti e Sicurezza',
        codice: 'I-12',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 9,
        anno: 2
    },
    {
        nome: 'Internet Reti e Sicurezza',
        codice: 'I-12',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 9,
        anno: 2
    },
    {
        nome: 'Sistemi Operativi',
        codice: 'I-13',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 9,
        anno: 2
    },
    {
        nome: 'Business and Management',
        codice: 'I-15',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 6,
        anno: 2
    },
    {
        nome: 'Pogrammazione Web',
        codice: 'I-16',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 6,
        anno: 3
    },
    {
        nome: 'Ingegneria del Software',
        codice: 'I-17',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Project',
        codice: 'I-18',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Stage',
        codice: 'I-20',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Prova Finale',
        codice: 'I-21',
        codFacolta: 'L31',
        usernameProf: '',
        cfu: 12,
        anno: 3
    },
]

});
informatica.save(function (err,ok) {
    if (err) throw err;
});

var matematica = new Facolta({
    nome: 'Matematica',
    codFacolta: 'L35',
    corsi:
    [  
      
        {
            nome: 'Analisi Matematica I',
            codice: 'M-50',
            codFacolta: 'L35',
            usernameProf:'francesco.calise',
            cfu: 12,
            anno: 1
        },
        {
            nome: 'Geometria I',
            codice: 'M-51',
            codFacolta: 'L35',
            usernameProf:'',
            cfu: 12,
            anno: 1
        },
        {
            nome: 'Algebra',
            codice: 'M-52',
            codFacolta: 'L35',
            usernameProf:'',
            cfu: 6,
            anno: 1
        },
        {
            nome: 'Fisica I',
            codice: 'M-53',
            codFacolta: 'L35',
            usernameProf:'',
            cfu: 6,
            anno: 1
    },
    {
        nome: 'Lingua Inglese (B1 or B2 level)',
        codice: 'M-54',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 1
    },
    {
        nome: 'Algebra e Logica',
        codice: 'M-55',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 9,
        anno: 1
    },
    {
        nome: 'Programmazione',
        codice: 'M-56',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 1
    },
    {
        nome: 'Geometria II',
        codice: 'M-57',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 12,
        anno: 2
    },
    {
        nome: 'Analisi Matematica II',
        codice: 'M-58',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 12,
        anno: 2
    },
    {
        nome: 'Fisica Matematica',
        codice: 'M-59',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 12,
        anno: 2
    },
    {
        nome: 'Probabilità',
        codice: 'M-60',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 2
    },
    {
        nome: 'Fisica Generale II',
        codice: 'M-61',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 2
    },
    {
        nome: 'Elementi di Matematica Computazionale',
        codice: 'M-62',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 2
    },
    {
        nome: 'Ricerca Operativa',
        codice: 'M-63',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 2
    },
    {
        nome: 'Laboratorio di Analisi Matematica III e Programmazione',
        codice: 'M-64',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Matematica Finanziaria',
        codice: 'M-65',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Tecniche di Ottimizzazione',
        codice: 'M-66',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 3
    },
    {
        nome: 'Analisi numerica',
        codice: 'M-67',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 3
    },
    {
        nome: 'Laboratorio di Fisica Termodinamica',
        codice: 'M-68',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Stage',
        codice: 'M-69',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 3
    },
    {
        nome: 'Prova Finale',
        codice: 'M-70',
        codFacolta: 'L35',
        usernameProf:'',
        cfu: 6,
        anno: 3
    },
]


});
matematica.save(function (err) {
    if (err) throw err;
});

var chimica = new Facolta({
    nome: 'Chimica',
    codFacolta: 'L27',
    corsi:  [
        {
            nome: 'Analisi I',
            codice: 'C-30',
            codFacolta: 'L27',
            usernameProf: 'alba.ciattaglia',
            cfu: 12,
            anno: 1
        },
        {
            nome: 'Fisica I-II',
            codice: 'C-31',
            codFacolta: 'L27',
            usernameProf:'',
            cfu: 12,
            anno: 1
        },
        {
            nome: 'Chimica Inorganica',
            codice: 'C-32',
            codFacolta: 'L27',
            usernameProf:'',
            cfu: 12,
            anno: 1
        },
        {
            nome: 'Chimica Analitica I',
            codice: 'C-33',
            codFacolta: 'L27',
            usernameProf:'',
            cfu: 12,
            anno: 1
    },
    {
        nome: 'Informatica e Applicazioni Numeriche',
        codice: 'C-34',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 1
    },
    {
        nome: 'Lingua Inglese (B1 or B2 level)',
        codice: 'C-35',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 6,
        anno: 1
    },
    {
        nome: 'Chimica Organica I',
        codice: 'C-36',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 2
    },
    {
        nome: 'Nozioni di Economia Generale',
        codice: 'C-37',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 4,
        anno: 2
    },
    {
        nome: 'Chimica Fisica I',
        codice: 'C-38',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 2
    },
    {
        nome: 'Chimica Fisica II',
        codice: 'C-39',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 2
    },
    {
        nome: 'Chimica Inorganica',
        codice: 'C-40',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 2
    },
    {
        nome: 'Biochimica ',
        codice: 'C-41',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 2
    },
    {
        nome: 'Chimica Analitica II',
        codice: 'C-42',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Chimica Organica II',
        codice: 'C-43',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 12,
        anno: 2
    },
    {
        nome: 'Chimica dei Materiali',
        codice: 'C-44',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 8,
        anno: 2
    },
    {
        nome: 'Chimica degli Alimenti ',
        codice: 'C-45',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 6,
        anno: 3
    },
    {
        nome: 'Chimica Molecolare ',
        codice: 'C-46',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 12,
        anno: 3
    },
    {
        nome: 'Stage',
        codice: 'C-47',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 10,
        anno: 3
    },
    {
        nome: 'Prova Finale',
        codice: 'C-48',
        codFacolta: 'L27',
        usernameProf:'',
        cfu: 5,
        anno: 3
    },
]
});
chimica.save(function (err) {
    if (err) throw err;
});

// ADD COLLABORATORI
///// HOW TO ADD A COLLABORATOR
//Cambia il nome della veriabile
/*
    //ADD AMMINISTRATORI
var admin1 = new admin({
    name: '',
    surname: '',
    gender:'',
    email: '@admin.it',
    username: ',
    password: createHash(''),
    state:'',
    address:'',
    city:'',
    phone:'',
    bod:''
});
admin1.save(function (err) {
    if (err) throw err;
});
    // ADD PROF
var prof1 = new prof({
    name: '',
    surname: '',
    gender:'',
    email: '@professore.it',
    username: '',
    password: createHash(''),
    state:'',
    address:'',
    city:'',
    phone:'',
    bod:'',
    codFacolta:'',
});
prof1.save(function (err) {
    if (err) throw err;
});    

*/

    //AGGIUNTI AMMINISTRATORI
    
var admin1 = new Admin({
    
    username: 'arianna.fedeli',
    password: createHash('ari'),
    ruolo:'admin',
});
admin1.save(function (err) {
    if (err) throw err;
});

    //AGGIUNGI PROFESSORI
var prof1 = new Prof({
    nameP: 'Marcello',
    surname: 'Rosati',
    gender:'M',
    email: 'marcello.rosati@professore.it',
    username: 'marcello.rosati',
    password: createHash('marce'),
    state:'Italia',
    address:'via casa dei pazzi,22',
    city:'manicomio',
    phone:'3333333333',
    bod:'1994-02-02',
    codFacolta:'L31',
    ruolo:'prof',
    corsi:[
        {
            nome: 'Programmazione',
            codice: 'I-01',
            codFacolta: informatica.codFacolta,
         
            cfu: 12,
            anno: 1
        }
    ]
});
prof1.save(function (err) {
    if (err) throw err;
});

var prof2 = new Prof({
    nameP: 'alba',
    surname: 'ciattaglia',
    gender:'F',
    email: 'alba.ciattaglia@professore.it',
    username: 'alba.ciattaglia',
    password: createHash('ciatta'),
    state:'italia',
    address:'casa',
    city:'Camerino',
    phone:'314141',
    bod:'1996-07-29',
    codFacolta:'L35',
    ruolo:'prof',
    corsi:[
        {
            nome: 'Analisi Matematica I',
            codice: 'M-50',
            codFacolta: 'L35',
            
            cfu: 12,
            anno: 1
        }
    ]
});
prof2.save(function (err) {
    if (err) throw err;
});

var prof3 = new Prof({
    nameP: 'francesco',
    surname: 'calise',
    gender:'M',
    email: 'francesco.calise@professore.it',
    username: 'francesco.calise',
    password: createHash('calise'),
    state:'italia',
    address:'casa',
    city:'Camerino',
    phone:'314141',
    bod:'1996-07-29',
    codFacolta:'L27',
    ruolo:'prof',
    corsi:[
    {
        nome: 'Analisi I',
        codice: 'C-30',
        codFacolta: 'L27',
     
        cfu: 12,
        anno: 1
    }
]
});
prof3.save(function (err) {
    if (err) throw err;
});


//AGGIUNTI Corsi
    //informatica

var programmazione = new Corsi({
    nome: 'Programmazione',
    codice: 'I-01',
    codFacolta: informatica.codFacolta,
    usernameProf: prof1.username,
    cfu: 12,
    anno: 1
});
programmazione.save(function (err) {
    if (err) throw err;
}); 

var analisi = new Corsi({
    nome: 'Analisi I',
    codice: 'I-02',
    codFacolta: informatica.codFacolta,
    usernameProf: prof1.username,
    cfu: 6,
    anno: 1
});
analisi.save(function (err) {
    if (err) throw err;
});

var logica = new Corsi({
    nome: 'Logica Matematica',
    codice: 'I-03',
    codFacolta: informatica.codFacolta,
    usernameProf: prof1.username,
    cfu: 6,
    anno: 1
});
logica.save(function (err) {
    if (err) throw err;
});

var inglese = new Corsi({
    nome: 'Lingua Inglese (B1 or B2 level)',
    codice: 'I-04',
    codFacolta: informatica.codFacolta,
    usernameProf: prof1.username,
    cfu: 6,
    anno: 1
});
inglese.save(function (err) {
    if (err) throw err;
});

var algebra = new Corsi({
    nome: 'Algebra Lineare',
    codice: 'I-05',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 6,
    anno: 1
});
algebra.save(function (err) {
    if (err) throw err;
});

var architettura = new Corsi({
    nome: 'Architettura degli Elaboratori',
    codice: 'I-06',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 12,
    anno: 1
});
architettura.save(function (err) {
    if (err) throw err;
});

var diritto = new Corsi({
    nome: 'Diritto delle Nuove Tecnologie',
    codice: 'I-07',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 6,
    anno: 1
});
diritto.save(function (err) {
    if (err) throw err;
});

var fondamenti = new Corsi({
    nome: 'Fondamenti di Informatica',
    codice: 'I-08',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 6,
    anno: 1
});
fondamenti.save(function (err) {
    if (err) throw err;
});

var asd = new Corsi({
    nome: 'Algoritmi e Strutture Dati',
    codice: 'I-09',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 12,
    anno: 2
});
asd.save(function (err) {
    if (err) throw err;
});

var prg = new Corsi({nome: 'Programmazione II',
    codice: 'I-10',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 9,
    anno: 2
    
});
prg.save(function (err) {
    if (err) throw err;
});

var basi = new Corsi({
    nome: 'Basi di Dati',
    codice: 'I-11',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 9,
    anno: 2
});
basi.save(function (err) {
    if (err) throw err;
});

var reti = new Corsi({
    nome: 'Internet Reti e Sicurezza',
    codice: 'I-12',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 9,
    anno: 2
});
reti.save(function (err) {
    if (err) throw err;
});

var sistemi = new Corsi({
    nome: 'Sistemi Operativi',
    codice: 'I-13',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 9,
    anno: 2
});
sistemi.save(function (err) {
    if (err) throw err;
});

var business = new Corsi({
    nome: 'Business and Management',
    codice: 'I-15',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 6,
    anno: 2
});
business.save(function (err) {
    if (err) throw err;
});

var web = new Corsi({
    nome: 'Pogrammazione Web',
    codice: 'I-16',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 6,
    anno: 3
});
web.save(function (err) {
    if (err) throw err;
});

var ing = new Corsi({
    nome: 'Ingegneria del Software',
    codice: 'I-17',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 12,
    anno: 3
});
ing.save(function (err) {
    if (err) throw err;
});

var project = new Corsi({
    nome: 'Project',
    codice: 'I-18',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 12,
    anno: 3
});
project.save(function (err) {
    if (err) throw err;
});



var stage = new Corsi({
    nome: 'Stage',
    codice: 'I-20',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 12,
    anno: 3
});
stage.save(function (err) {
    if (err) throw err;
});

var fine = new Corsi({
    nome: 'Prova Finale',
    codice: 'I-21',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
    cfu: 12,
    anno: 3
});
fine.save(function (err) {
    if (err) throw err;
}); 


//chimica

var analisiC = new Corsi({
    nome: 'Analisi I',
    codice: 'C-30',
    codFacolta: chimica.codFacolta,
    usernameProf: prof2.username,
    cfu: 12,
    anno: 1
});
analisiC.save(function (err) {
    if (err) throw err;
});

var fisica = new Corsi({
    nome: 'Fisica I-II',
    codice: 'C-31',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 1
});
fisica.save(function (err) {
    if (err) throw err;
});

var chimicaInorganica = new Corsi({
    nome: 'Chimica Inorganica',
    codice: 'C-32',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 1
});
chimicaInorganica.save(function (err) {
    if (err) throw err;
});

var chimicaAnalitica = new Corsi({
    nome: 'Chimica Analitica I',
    codice: 'C-33',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 1
});
chimicaAnalitica.save(function (err) {
    if (err) throw err;
})

var info = new Corsi({
    nome: 'Informatica e Applicazioni Numeriche',
    codice: 'C-34',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 1
});
info.save(function (err) {
    if (err) throw err;
});

var ingl = new Corsi({
    nome: 'Lingua Inglese (B1 or B2 level)',
    codice: 'C-35',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 1
});
ingl.save(function (err) {
    if (err) throw err;
});

var chimicaOrganica = new Corsi({
    nome: 'Chimica Organica I',
    codice: 'C-36',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 2
});
chimicaOrganica.save(function (err) {
    if (err) throw err;
});

var eco = new Corsi({
    nome: 'Nozioni di Economia Generale',
    codice: 'C-37',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 4,
    anno: 2
});
eco.save(function (err) {
    if (err) throw err;
});

var chimF = new Corsi({
    nome: 'Chimica Fisica I',
    codice: 'C-38',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 2
});
chimF.save(function (err) {
    if (err) throw err;
});

var chimFi = new Corsi({
    nome: 'Chimica Fisica II',
    codice: 'C-39',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 2
});
chimFi.save(function (err) {
    if (err) throw err;
});

var chimicaIn = new Corsi({
    nome: 'Chimica Inorganica',
    codice: 'C-40',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 2
});
chimicaIn.save(function (err) {
    if (err) throw err;
});

var bio = new Corsi({
    nome: 'Biochimica ',
    codice: 'C-41',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 2
});
bio.save(function (err) {
    if (err) throw err;
});

var chimicaAnaliticaII = new Corsi({
    nome: 'Chimica Analitica II',
    codice: 'C-42',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 3
});
chimicaAnaliticaII.save(function (err) {
    if (err) throw err;
})

var chimicaOrganicaII = new Corsi({
    nome: 'Chimica Organica II',
    codice: 'C-43',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 2
});
chimicaOrganicaII.save(function (err) {
    if (err) throw err;
});

var materiali = new Corsi({
    nome: 'Chimica dei Materiali',
    codice: 'C-44',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 8,
    anno: 2
});
materiali.save(function (err) {
    if (err) throw err;
});

var alimenti = new Corsi({
    nome: 'Chimica degli Alimenti ',
    codice: 'C-45',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 3
});
alimenti.save(function (err) {
    if (err) throw err;
});

var molecolare = new Corsi({
    nome: 'Chimica Molecolare ',
    codice: 'C-46',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 3
});
molecolare.save(function (err) {
    if (err) throw err;
});

var stageC = new Corsi({
    nome: 'Stage',
    codice: 'C-47',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 10,
    anno: 3
});
stageC.save(function (err) {
    if (err) throw err;
});

var fineC = new Corsi({
    nome: 'Prova Finale',
    codice: 'C-48',
    codFacolta: chimica.codFacolta,
    usernameProf:'',
    cfu: 5,
    anno: 3
});
fineC.save(function (err) {
    if (err) throw err;
}); 

 
//matematica
var analisimath = new Corsi({
    nome: 'Analisi Matematica I',
    codice: 'M-50',
    codFacolta: matematica.codFacolta,
    usernameProf:prof3.username,
    cfu: 12,
    anno: 1
});
analisimath.save(function (err) {
    if (err) throw err;
});

var geometria = new Corsi({
    nome: 'Geometria I',
    codice: 'M-51',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 1
});
geometria.save(function (err) {
    if (err) throw err;
});

var alg = new Corsi({
    nome: 'Algebra',
    codice: 'M-52',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 1
});
alg.save(function (err) {
    if (err) throw err;
});

var fis = new Corsi({
    nome: 'Fisica I',
    codice: 'M-53',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 1
});
fis.save(function (err) {
    if (err) throw err;
});

var inglM = new Corsi({
    nome: 'Lingua Inglese (B1 or B2 level)',
    codice: 'M-54',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 1
});
inglM.save(function (err) {
    if (err) throw err;
});

var algLog = new Corsi({
    nome: 'Algebra e Logica',
    codice: 'M-55',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 9,
    anno: 1
});
algLog.save(function (err) {
    if (err) throw err;
});

var prgM = new Corsi({
    nome: 'Programmazione',
    codice: 'M-56',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 1
});
prgM.save(function (err) {
    if (err) throw err;
});

var geo = new Corsi({
    nome: 'Geometria II',
    codice: 'M-57',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 2
});
geo.save(function (err) {
    if (err) throw err;
});

var analisimathII = new Corsi({
    nome: 'Analisi Matematica II',
    codice: 'M-58',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 2
});
analisimathII.save(function (err) {
    if (err) throw err;
});

var fisicaMath = new Corsi({
    nome: 'Fisica Matematica',
    codice: 'M-59',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 2
});
fisicaMath.save(function (err) {
    if (err) throw err;
});

var probM = new Corsi({
    nome: 'Probabilità',
    codice: 'M-60',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 2
});
probM.save(function (err) {
    if (err) throw err;
});

var fisicaGenII = new Corsi({
    nome: 'Fisica Generale II',
    codice: 'M-61',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 2
});
fisicaGenII.save(function (err) {
    if (err) throw err;
});

var eleMath = new Corsi({
    nome: 'Elementi di Matematica Computazionale',
    codice: 'M-62',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 2
});
eleMath.save(function (err) {
    if (err) throw err;
});

var ricOp = new Corsi({
    nome: 'Ricerca Operativa',
    codice: 'M-63',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 2
});
ricOp.save(function (err) {
    if (err) throw err;
});

var analisilab = new Corsi({
    nome: 'Laboratorio di Analisi Matematica III e Programmazione',
    codice: 'M-64',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 3
});
analisilab.save(function (err) {
    if (err) throw err;
});

var mathFin = new Corsi({
    nome: 'Matematica Finanziaria',
    codice: 'M-65',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 3
});
mathFin.save(function (err) {
    if (err) throw err;
});

var ottimizzazione = new Corsi({
    nome: 'Tecniche di Ottimizzazione',
    codice: 'M-66',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 3
});
ottimizzazione.save(function (err) {
    if (err) throw err;
});

var numerica = new Corsi({
    nome: 'Analisi numerica',
    codice: 'M-67',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 3
});
numerica.save(function (err) {
    if (err) throw err;
});

var fisicatermo = new Corsi({
    nome: 'Laboratorio di Fisica Termodinamica',
    codice: 'M-68',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 12,
    anno: 3
});
fisicatermo.save(function (err) {
    if (err) throw err;
});

var stageM = new Corsi({
    nome: 'Stage',
    codice: 'M-69',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 3
});
stageM.save(function (err) {
    if (err) throw err;
});

var fineM = new Corsi({
    nome: 'Prova Finale',
    codice: 'M-70',
    codFacolta: matematica.codFacolta,
    usernameProf:'',
    cfu: 6,
    anno: 3
});
fineM.save(function (err) {
    if (err) throw err;
});
 
//AGGIUNGI STUDENTI

var Student1 = new Student ({
    name: 'Sara',
    surname: 'Fedeli',
    state: 'Italy',
    city: 'Fermo',
    address: 'Via campania 1',
    bod: new Date (2001,10,02),
    matricola: '093456',
    codFacolta: 'L31',
    email: 'sara.fedeli@studenti.unicam.it',
    phone:'3394848282',
    username: 'sara.fedeli',
    password: createHash('saretta'),
    gender: 'F',
    annoCorso: '1',
    ruolo:'student',
    esamifatti: [{
        nome:diritto.nome,
        codCorso: diritto.codice,
        data: '2017-12-16',
        esito: 28,
        cfu: diritto.cfu,
        matricolastud:Student1.matricola
        
    },
    {
        nome:fondamenti.nome,
        codCorso: fondamenti.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: fondamenti.cfu,
        matricolastud:Student1.matricola
        
    },
    {
        nome:algebra.nome,
        codCorso: algebra.codice,
        data: '2017-05-21',
        esito: 27,
        cfu: algebra.cfu,
        matricolastud:Student1.matricola
        
    },
    {
        nome:analisi.nome,
        codCorso: analisi.codice,
        data: '2017-09-04',
        esito: 25,
        cfu: analisi.cfu,
        matricolastud:Student1.matricola
        
    }],
   
});
Student1.save(function (err) {
    if (err) throw err;
});

 var Student2 = new Student ({
    name: 'Silvia',
    surname: 'Nigrisoli',
    gender: 'F',
    email: 'silvia.nigrisoli@studenti.unicam.it',
    username: 'silvia.nigrisoli',
    password: createHash('silvietta'),
    state: 'Italy',
    city: 'Fermo',
    address: 'Via campania 1',
    phone:'3394678282',
    bod:new Date (1967,02,14),
    annoCorso: '2',
    codFacolta: 'L31',
    matricola: '0934576',
    ruolo:'student',
    esamifatti: [
    {
        nome:fondamenti.nome,
        codCorso: fondamenti.codice,
        data: '2016-02-18',
        esito: 30,
        cfu: fondamenti.cfu,
        matricolastud:Student2.matricola
        
    },
    {
        nome:algebra.nome,
        codCorso: algebra.codice,
        data: '2017-05-21',
        esito: 27,
        cfu: algebra.cfu,
        matricolastud:Student2.matricola
    },
    {
        nome:analisi.nome,
        codCorso: analisi.codice,
        data: '2016-09-04',
        esito: 26,
        cfu: analisi.cfu,
        matricolastud:Student2.matricola
    },
    {
        nome:architettura.nome,
        codCorso: architettura.codice,
        data: '2017-10-06',
        esito: 28,
        cfu: architettura.cfu,
        matricolastud:Student2.matricola
    },
    {   nome:prg.nome,
        codCorso: prg.codice,
        data: '2017-09-04',
        esito: 26,
        cfu: prg.cfu,
        matricolastud:Student2.matricola
    },
    {nome:asd.nome,
        codCorso: asd.codice,
        data: '2017-09-22',
        esito: 27,
        cfu: asd.cfu,
        matricolastud:Student2.matricola
    }


],
});
Student2.save(function (err) {
    if (err) throw err;
});  


//AGGIUNTA STUDENTI ALTRI ANNI
var Student3 =new Student({

name: 'Stefano',
surname: 'Rosati',
gender: 'M',
email: 'stefano.rosati@studenti.unicam.it',
username: 'stefano.rosati',
password: createHash('stefano'),
state: 'Italy',
city: 'Grottammare',
address: 'Via G.Leopardi 31',
phone:'3345896571',
bod: new Date(2003,11,13),
annoCorso: '2',
codFacolta: 'L35',
matricola: '093569',
esamifatti: [{
    nome:analisimath.nome,
    codCorso: analisimath.codice,
    data: '2016-12-16',
    esito: 18,
    cfu: analisimath.cfu,
    matricolastud:Student3.matricola
},
{nome:geometria.nome,
    codCorso: geometria.codice,
    data: '2017-02-11',
    esito: 23,
    cfu: geometria.cfu,
    matricolastud:Student3.matricola
},
{nome:alg.nome,
    codCorso: alg.codice,
    data: '2016-05-21',
    esito: 22,
    cfu: alg.cfu,
    matricolastud:Student3.matricola
},
{nome:geo.nome,
    codCorso: geo.codice,
    data: '2017-09-04',
    esito: 25,
    cfu: geo.cfu,
    matricolastud:Student3.matricola
},
{ nome:analisimathII.nome,
    codCorso: analisimathII.codice,
    data: '2017-10-10',
    esito: 21,
    cfu: analisimathII.cfu,
    matricolastud:Student3.matricola
},
{
    nome:probM.nome,
    codCorso: probM.codice,
    data: '2017-11-27',
    esito: 24,
    cfu: probM.cfu,
    matricolastud:Student3.matricola
},
{   nome:inglM.nome,
    codCorso: inglM.codice,
    data: '2016-02-11',
    esito: 20,
    cfu: inglM.cfu,
    matricolastud:Student3.matricola
}


],


});
Student3.save(function (err) {
    if (err) throw err;
});

var Student4 =new Student({
    
    name: 'Edoardo',
    surname: 'Piergentili',
    gender: 'M',
    email: 'edoardo.piergentili@studenti.unicam.it',
    username: 'edoardo.piergentili',
    password: createHash('edo'),
    state: 'Italy',
    city: 'Sarnano',
    address: 'Via Dei Campi 60',
    phone:'3208759641',
    bod: new Date (1992,10,16),
    annoCorso: '3',
    codFacolta: 'L27',
    matricola: '093458',
    ruolo:'student',
    esamifatti: [{
        nome:analisiC.nome,
        codCorso: analisiC.codice,
        data: '2015-12-16',
        esito: 28,
        cfu: analisiC.cfu,
        matricolastud:Student4.matricola
    },
    {
        nome:fisica.nome,
        
        codCorso: fisica.codice,
        data: '2015-02-20',
        esito: 29,
        cfu: fisica.cfu,
        matricolastud:Student4.matricola
    },
    {
        nome:chimicaInorganica.nome,
        
        codCorso: chimicaInorganica.codice,
        data: '2016-05-15',
        esito: 27,
        cfu: algebra.cfu,
        matricolastud:Student4.matricola
    },
    {        nome:chimicaOrganica.nome,
        
        codCorso: chimicaOrganica.codice,
        data: '2016-09-08',
        esito: 25,
        cfu: analisi.cfu,
        matricolastud:Student4.matricola
    },
    {        nome:eco.nome,
        
        codCorso: eco.codice,
        data: '2017-10-14',
        esito: 26,
        cfu: eco.cfu,
        matricolastud:Student4.matricola
    },
    {        nome:alimenti.nome,
        
        codCorso: alimenti.codice,
        data: '2017-12-16',
        esito: 26,
        cfu: alimenti.cfu,
        matricolastud:Student4.matricola
    },
    {        nome:molecolare.nome,
        
        codCorso: molecolare.codice,
        data: '2017-03-31S',
        esito: 31,
        cfu: molecolare.cfu,
        matricolastud:Student4.matricola
    }




],
    
    });
    Student4.save(function (err) {
        if (err) throw err;
    });
    //esami Fatti

    var dir = new ExamPassed({
        nome:diritto.nome,
        codCorso: diritto.codice,
        data: '2017-12-16',
        esito: 28,
        cfu: diritto.cfu,
        matricolastud:Student1.matricola
        
    });
    dir.save(function (err) {
        if (err) throw err;
    });
    var fond = new ExamPassed({
        nome:fondamenti.nome,
        codCorso: fondamenti.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: fondamenti.cfu,
        matricolastud:Student1.matricola
        
    });
    fond.save(function (err) {
        if (err) throw err;
    });
    var alg = new ExamPassed({
        nome:algebra.nome,
        codCorso: algebra.codice,
        data: '2017-05-21',
        esito: 27,
        cfu: algebra.cfu,
        matricolastud:Student1.matricola
        
    });
    alg.save(function (err) {
        if (err) throw err;
    });
    var anal = new ExamPassed({
        nome:analisi.nome,
        codCorso: analisi.codice,
        data: '2017-09-04',
        esito: 25,
        cfu: analisi.cfu,
        matricolastud:Student1.matricola
        
    });
    anal.save(function (err) {
        if (err) throw err;
    });   
    var fond1 = new ExamPassed({
        nome:fondamenti.nome,
        codCorso: fondamenti.codice,
        data: '2016-02-18',
        esito: 30,
        cfu: fondamenti.cfu,
        matricolastud:Student2.matricola
    });
    fond1.save(function (err) {
        if (err) throw err;
    });
    var alg1 = new ExamPassed({
        nome:algebra.nome,
        codCorso: algebra.codice,
        data: '2017-05-21',
        esito: 27,
        cfu: algebra.cfu,
        matricolastud:Student2.matricola
        
    });
    alg1.save(function (err) {
        if (err) throw err;
    });
    var anal1 = new ExamPassed({
        nome:analisi.nome,
        codCorso: analisi.codice,
        data: '2016-09-04',
        esito: 26,
        cfu: analisi.cfu,
        matricolastud:Student2.matricola
        
    });
    anal1.save(function (err) {
        if (err) throw err;
    });   
    var arch = new ExamPassed({
        nome:architettura.nome,
        codCorso: architettura.codice,
        data: '2017-10-06',
        esito: 28,
        cfu: architettura.cfu,
        matricolastud:Student2.matricola
        
    });
    
    arch.save(function (err) {
        if (err) throw err;
    });  

     var prg = new ExamPassed({
        nome:prg.nome,
        codCorso: prg.codice,
        data: '2017-09-04',
        esito: 26,
        cfu: prg.cfu,
        matricolastud:Student2.matricola
        
    });
    prg.save(function (err) {
        if (err) throw err;
    });   
    var asd = new ExamPassed({
        nome:asd.nome,
        codCorso: asd.codice,
        data: '2017-09-22',
        esito: 27,
        cfu: asd.cfu,
        matricolastud:Student2.matricola
        
    });
    asd.save(function (err) {
        if (err) throw err;
    });  
  /*   var analM = new ExamPassed({
        nome:analisimath.nome,
        codCorso: analisimath.codice,
        data: '2016-12-16',
        esito: 18,
        cfu: analisimath.cfu
        
    });
    analM.save(function (err) {
        if (err) throw err;
    });   
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
    var geo = new ExamPassed({
        nome:geometria.nome,
        codCorso: geometria.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: geometria.cfu
        
    });
    geo.save(function (err) {
        if (err) throw err;
    });
     */
//Mi disconnetto dal database
//mongoose.connection.close();