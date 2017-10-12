//script per popolare il database

var Facolta = require('./server/models/facolta');
var Admin = require('./server/models/admin');
var Prof = require('./server/models/professore'); 
var Student = require ('./server/models/student');
var Corsi = require('./server/models/corsi');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/ProgrammazioneWeb";

/*  var studenti = require('./models/student');
    var urlDb = require('./config');
*/


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
});
informatica.save(function (err) {
    if (err) throw err;
});

var matematica = new Facolta({
    nome: 'Matematica',
    codFacolta: 'L35'
});
matematica.save(function (err) {
    if (err) throw err;
});

var chimica = new Facolta({
    nome: 'Chimica',
    codFacolta: 'L27'
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
    name: 'Arianna',
    surname: 'Fedeli',
    gender:'F',
    email: 'arianna.fedeli@admin.it',
    username: 'arianna.fedeli',
    password: createHash('ari'),
    state:'Italia',
    address:'via casa dei pazzi,22',
    city:'manicomio',
    phone:'3333333333',
    bod:'05-01-1995'
});
admin1.save(function (err) {
    if (err) throw err;
});

    //AGGIUNGI PROFESSORI
var prof1 = new Prof({
    name: 'Marcello',
    surname: 'Rosati',
    gender:'M',
    email: 'marcello.rosati@professore.it',
    username: 'marcello.rosati',
    password: createHash('marce'),
    state:'Italia',
    address:'via casa dei pazzi,22',
    city:'manicomio',
    phone:'3333333333',
    bod:'02-02-1994',
    codFacolta:'L31',
});
prof1.save(function (err) {
    if (err) throw err;
});

var prof2 = new Prof({
    name: 'alba',
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
});
prof2.save(function (err) {
    if (err) throw err;
});

var prof3 = new Prof({
    name: 'francesco',
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
});
prof3.save(function (err) {
    if (err) throw err;
});


//AGGIUNTI Corsi
    //informatica
/* 
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
     */
var analisi = new Corsi({
    nome: 'Analisi I',
    codice: 'I-02',
    codFacolta: informatica.codFacolta,
    usernameProf: '',
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
    usernameProf: '',
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
    usernameProf: '',
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
    codFacolta: 'L-31',
    email: 'sara.fedeli@studenti.unicam.it',
    phone:'3394848282',
    username: 'sara.fedeli',
    password: createHash('saretta'),
    gender: 'F',
    annoCorso: '1',
    esamifatti: [{
        codCorso: prg.codice,
        data: '2016-12-16',
        esito: 28,
        cfu: prg.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: fondamenti.cfu
    },
    {
        codCorso: algebra.codice,
        data: '2017-05-21',
        esito: 27,
        cfu: algebra.cfu
    },
    {
        codCorso: analisi.codice,
        data: '2017-09-04',
        esito: 25,
        cfu: analisi.cfu
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
    codFacolta: 'L-31',
    matricola: '0934576',
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
codFacolta: 'L-35',
matricola: '093569',
    


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
    codFacolta: 'L-27',
    matricola: '093458',
    
    });
    Student4.save(function (err) {
        if (err) throw err;
    });
/*
//AGGIUNTA STUDENTI ANNI > 1
//informatica
var stud1 = new studenti({
    nome: 'Serena',
    cognome: 'Ferrari',
    stato: 'Italia',
    città: 'Frosinone',
    cap: 03033,
    dataDiNascita: new Date(1992, 12, 12),
    matricola: 'S001',
    codFacolta: informatica.codice,
    email: 'serena.ferrari@hotmail.it',
    emailUniversitaria: 'serena.ferrari@studenti.unims.it',
    username: 'serena.ferrari',
    password: createHash('serena'),
    carriera: [{
        codCorso: programmazione.codice,
        data: '2016-12-16',
        esito: 28,
        cfu: programmazione.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '2017-02-11',
        esito: 23,
        cfu: fondamenti.cfu
    },
    {
        codCorso: algebra.codice,
        data: '2017-05-21',
        esito: 27,
        cfu: algebra.cfu
    },
    {
        codCorso: analisi.codice,
        data: '2017-09-04',
        esito: 25,
        cfu: analisi.cfu
    }], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud1.save(function (err) {
    if (err) throw err;
});

var stud2 = new studenti({
    nome: 'Marco',
    cognome: 'Coppola',
    stato: 'Italia',
    città: 'Macerata',
    cap: 62100,
    dataDiNascita: new Date(1995, 06, 24),
    matricola: 'S002',
    codFacolta: informatica.codice,
    email: 'marco.coppola@hotmail.it',
    emailUniversitaria: 'marco.coppola@studenti.unims.it',
    username: 'marco.coppola',
    password: createHash('marco'),
    carriera: [{
        codCorso: programmazione.codice,
        data: '2017-02-20',
        esito: 27,
        cfu: programmazione.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '2017-02-18',
        esito: 29,
        cfu: fondamenti.cfu
    },
    {
        codCorso: logica.codice,
        data: '2017-09-13',
        esito: 26,
        cfu: logica.cfu
    },
    {
        codCorso: architettura.codice,
        data: '2017-07-19',
        esito: 30,
        cfu: architettura.cfu
    },
    {
        codCorso: algebra.codice,
        data: '2017-06-27',
        esito: 30,
        cfu: algebra.cfu
    },
    {
        codCorso: diritto.codice,
        data: '2016-12-16',
        esito: 27,
        cfu: diritto.cfu
    }], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud2.save(function (err) {
    if (err) throw err;
});

var stud3 = new studenti({
    nome: 'Silvio',
    cognome: 'Leone',
    stato: 'Italia',
    città: 'Camerino',
    cap: 62032,
    dataDiNascita: new Date(1991, 09, 07),
    matricola: 'S003',
    codFacolta: informatica.codice,
    email: 'silvio.leone@hotmail.it',
    emailUniversitaria: 'silvio.leone@studenti.unims.it',
    username: 'silvio.leone',
    password: createHash('silvio'),
    carriera: [{
        codCorso: programmazione.codice,
        data: '2015-12-01',
        esito: 22,
        cfu: programmazione.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '2017-02-07',
        esito: 26,
        cfu: fondamenti.cfu
    },
    {
        codCorso: algebra.codice,
        data: '2015-11-25',
        esito: 29,
        cfu: algebra.cfu
    },
    {
        codCorso: analisi.codice,
        data: '2015-12-15',
        esito: 21,
        cfu: analisi.cfu
    },
    {
        codCorso: basi.codice,
        data: '2017-06-29',
        esito: 30,
        cfu: basi.cfu
    },
    {
        codCorso: sistemi.codice,
        data: '2016-01-06',
        esito: 29,
        cfu: sistemi.cfu
    },
    {
        codCorso: business.codice,
        data: '2017-04-11',
        esito: 25,
        cfu: business.cfu
    },
    {
        codCorso: reti.codice,
        data: '2016-07-23',
        esito: 19,
        cfu: reti.cfu
    },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud3.save(function (err) {
    if (err) throw err;
});

//chimica
var stud4 = new studenti({
    nome: 'Fabio',
    cognome: 'Costa',
    stato: 'Italia',
    città: 'Ancona',
    cap: 60121,
    dataDiNascita: new Date(1994, 04, 10),
    matricola: 'S004',
    codFacolta: chimica.codice,
    email: 'fabio.costa@hotmail.it',
    emailUniversitaria: 'fabio.costa@studenti.unims.it',
    username: 'fabio.costa',
    password: createHash('fabio'),
    carriera: [{
        codCorso: analisiC.codice,
        data: '2016-12-16',
        esito: 21,
        cfu: analisiC.cfu
    },
    {
        codCorso: fisica.codice,
        data: '2017-01-24',
        esito: 25,
        cfu: fisica.cfu
    },
    {
        codCorso: ingl.codice,
        data: '2017-02-21',
        esito: 27,
        cfu: ingl.cfu
    },
    {
        codCorso: info.codice,
        data: '2016-03-06',
        esito: 28,
        cfu: info.cfu
    },
    {
        codCorso: chimicaInorganica.codice,
        data: '2017-02-19',
        esito: 23,
        cfu: chimicaInorganica.cfu
    },
    ], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud4.save(function (err) {
    if (err) throw err;
});

var stud5 = new studenti({
    nome: 'Nicole',
    cognome: 'Colombo',
    stato: 'Italia',
    città: 'Spoleto',
    cap: 16049,
    dataDiNascita: new Date(1993, 03, 12),
    matricola: 'S005',
    codFacolta: chimica.codice,
    email: 'nicole.colombo@hotmail.it',
    emailUniversitaria: 'nicole.colombo@studenti.unims.it',
    username: 'nicole.colombo',
    password: createHash('nicole'),
    carriera: [{
        codCorso: analisiC.codice,
        data: '08 / 06 / 2015',
        esito: 26,
        cfu: analisiC.cfu
    },
    {
        codCorso: fisica.codice,
        data: '22 / 07 / 2015',
        esito: 25,
        cfu: fisica.cfu
    },
    {
        codCorso: ingl.codice,
        data: '17 / 09 / 2015',
        esito: 20,
        cfu: ingl.cfu
    },
    {
        codCorso: info.codice,
        data: '01 / 03 / 2016',
        esito: 28,
        cfu: info.cfu
    },
    {
        codCorso: chimicaOrganica.codice,
        data: '17 / 06 / 2016',
        esito: 23,
        cfu: chimicaOrganica.cfu
    },
    {
        codCorso: eco.codice,
        data: '31 / 07 / 2016',
        esito: 29,
        cfu: eco.cfu
    },
    {
        codCorso: bio.codice,
        data: '24 / 09 / 2016',
        esito: 25,
        cfu: bio.cfu
    },
    {
        codCorso: chimFi.codice,
        data: '01 / 03 / 2016',
        esito: 28,
        cfu: chimFi.cfu
    },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud5.save(function (err) {
    if (err) throw err;
});

var stud6 = new studenti({
    nome: 'Giulia',
    cognome: 'Fabbri',
    stato: 'Italia',
    città: 'Torino',
    cap: 10121,
    dataDiNascita: new Date(1996, 10, 18),
    matricola: 'S006',
    codFacolta: chimica.codice,
    email: 'giulia.fabbri@hotmail.it',
    emailUniversitaria: 'giulia.fabbri@studenti.unims.it',
    username: 'giulia.fabbri',
    password: createHash('giulia'),
    carriera: [
        {
            codCorso: fisica.codice,
            data: '2016-02-26',
            esito: 30,
            cfu: fisica.cfu
        },
        {
            codCorso: info.codice,
            data: '2016-05-02',
            esito: 28,
            cfu: info.cfu
        },
        {
            codCorso: chimicaInorganica.codice,
            data: '2016-06-26',
            esito: 27,
            cfu: chimicaInorganica.cfu
        },
        {
            codCorso: eco.codice,
            data: '2017-02-14',
            esito: 29,
            cfu: eco.cfu
        },
        {
            codCorso: bio.codice,
            data: '2017-04-19',
            esito: 30,
            cfu: bio.cfu
        }], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud6.save(function (err) {
    if (err) throw err;
});

//matematica
var stud7 = new studenti({
    nome: 'Matilde',
    cognome: 'Ricci',
    stato: 'Italia',
    città: 'Bologna',
    cap: 40121,
    dataDiNascita: new Date(1995, 07, 11),
    matricola: 'S007',
    codFacolta: matematica.codice,
    email: 'matilde.ricci@hotmail.it',
    emailUniversitaria: 'matilde.ricci@studenti.unims.it',
    username: 'matilde.ricci',
    password: createHash('matilde'),
    carriera: [{
        codCorso: geometria.codice,
        data: '2017-02-30',
        esito: 24,
        cfu: geometria.cfu
    },
    {
        codCorso: alg.codice,
        data: '2015-02-22',
        esito: 25,
        cfu: alg.cfu
    },
    {
        codCorso: fis.codice,
        data: '2017-04-06',
        esito: 28,
        cfu: fis.cfu
    },
    {
        codCorso: prgM.codice,
        data: '2017-06-15',
        esito: 22,
        cfu: prgM.cfu
    },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud7.save(function (err) {
    if (err) throw err;
});

var stud8 = new studenti({
    nome: 'Marco',
    cognome: 'Greco',
    stato: 'Italia',
    città: 'Napoli',
    cap: 80121,
    dataDiNascita: new Date(1991, 01, 23),
    matricola: 'S008',
    codFacolta: matematica.codice,
    email: 'marco.greco@hotmail.it',
    emailUniversitaria: 'marco.greco@studenti.unims.it',
    username: 'marco.greco',
    password: createHash('marco'),
    carriera: [
        {
            codCorso: alg.codice,
            data: '2016-02-16',
            esito: 23,
            cfu: alg.cfu
        },
        {
            codCorso: fis.codice,
            data: '2016-04-22',
            esito: 27,
            cfu: fis.cfu
        },
        {
            codCorso: prgM.codice,
            data: '2016-06-19',
            esito: 30,
            cfu: prgM.cfu
        },
        {
            codCorso: eleMath.codice,
            data: '2017-02-05',
            esito: 23,
            cfu: eleMath.cfu
        },
        {
            codCorso: ricOp.codice,
            data: '2017-02-17',
            esito: 28,
            cfu: ricOp.cfu
        },
        {
            codCorso: probM.codice,
            data: '2017-06-19',
            esito: 27,
            cfu: probM.cfu
        },
        {
            codCorso: fisicaGenII.codice,
            data: '2017-09-08',
            esito: 25,
            cfu: fisicaGenII.cfu
        },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud8.save(function (err) {
    if (err) throw err;
});

var stud9 = new studenti({
    nome: 'Carlotta',
    cognome: 'Pepe',
    stato: 'Italia',
    città: 'Lecce',
    cap: 73100,
    dataDiNascita: new Date(1994, 11, 04),
    matricola: 'S009',
    codFacolta: matematica.codice,
    email: 'carlotta.pepe@hotmail.it',
    emailUniversitaria: 'carlotta.pepe@studenti.unims.it',
    username: 'carlotta.pepe',
    password: createHash('carlotta'),
    carriera: [
        {
            codCorso: alg.codice,
            data: '2015-09-15',
            esito: 27,
            cfu: alg.cfu
        },
        {
            codCorso: fis.codice,
            data: '2016-04-16',
            esito: 28,
            cfu: fis.cfu
        },
        {
            codCorso: geometria.codice,
            data: '2016-07-08',
            esito: 25,
            cfu: geometria.cfu
        },
        {
            codCorso: prgM.codice,
            data: '2016-07-19',
            esito: 29,
            cfu: prgM.cfu
        },
        {
            codCorso: eleMath.codice,
            data: '2017-01-22',
            esito: 24,
            cfu: eleMath.cfu
        },
        {
            codCorso: probM.codice,
            data: '2017-06-14',
            esito: 27,
            cfu: probM.cfu
        },
    ], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud9.save(function (err) {
    if (err) throw err;
}); */


//Mi disconnetto dal database
mongoose.connection.close();