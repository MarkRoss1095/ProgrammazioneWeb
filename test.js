var Facolta = require('./server/models/facolta');
var url = "mongodb://localhost/ProgrammazioneWeb";
var mongoose = require('mongoose');

mongoose.connect(url);
var con = mongoose.connection;
con.on('error', function (err){
   console.log('errore di connessione', err);
});

con.once('open', function (){
console.log('connessione al database TEST riuscita!');
});


// CARICAMENTO CORSI IN FACOLTA INFROMATICA

Facolta.findOneAndUpdate({
    codFacolta:'L31'
},
{
    $set:
            {
                corsi:  [
                            {
                                nome: 'Analisi I',
                                codice: 'I-02',
                                codFacolta: 'L31',
                                usernameProf: '',
                                cfu: 6,
                                anno: 1
                            },
                            {
                                nome: 'Logica Matematica',
                                codice: 'I-03',
                                codFacolta: 'L31',
                                usernameProf: '',
                                cfu: 6,
                                anno: 1
                            },
                            {
                                nome: 'Lingua Inglese (B1 or B2 level)',
                                codice: 'I-04',
                                codFacolta: 'L31',
                                usernameProf: '',
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
            
            }
        
},{new: true},function(err){
    if (err) throw err;
})

// CARICAMENTO CORSI IN FACOLTA DI CHIMICA

Facolta.findOneAndUpdate({
    codFacolta:'L27'
},
{
    $set:
            {
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
            
            }
        
},{new: true},function(err){
    if (err) throw err;
})

// CARICAMENTO ESAMI IN FACOLTA MATEMATICA

Facolta.findOneAndUpdate({
    codFacolta:'L35'
},
{
    $set:
            {
                corsi:  [
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
            
            }
        
},{new: true},function(err){
    if (err) throw err;
})


//Mi disconnetto dal database
mongoose.connection.close();