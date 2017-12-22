Student = require('../models/student');
Facolta = require('../models/facolta');
Corso = require('../models/corsi');
Appello = require('../models/appello');
Elenco = require('../models/elencostudenti');
ExamPassed = require('../models/esamisvolti')
var bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

const existing = 11000;

// FUNCTION //

/**Funzione per criptare la password nel db */
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//funzionante
exports.addStudent = function (req, res, next) {

    if (!req.body.name || !req.body.surname || req.body.name == "" || req.body.surname == "") {
        return res.json({ state: false, message: 'name and surname are required' });
    }

    if (!req.body.password || !req.body.username || req.body.username == "" || req.body.password == "") {
        return res.json({ state: false, message: 'username and password are required' });
    }

    if (!req.body.email || req.body.email == "") {
        return res.json({ state: false, message: 'email is required' });
    }
    if (!req.body.gender || req.body.gender == "") {
        return res.json({ state: false, message: 'gender is required' });
    }

    if (!req.body.state || !req.body.city || req.body.city == "" || req.body.state == "") {
        return res.json({ state: false, message: 'state and city are required' });
    }
    if (!req.body.bod || req.body.bod == "") {
        return res.json({ state: false, message: 'date is required' });
    }


    if (!req.body.address || req.body.address == "") {
        return res.json({ state: false, message: 'address is required' });
    }

    if (!req.body.codFacolta || req.body.codFacolta == "") {
        return res.json({ state: false, message: 'codicefacoltà is required' });
    }

    if (!req.body.matricola || req.body.matricola == "") {
        return res.json({ state: false, message: 'matricola is required' });
    } else {

        //if the are not error you can create a new student 

        var newStudent = new Student({
            username: req.body.username,
            password: createHash(req.body.password),
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            bod: req.body.bod,
            gender: req.body.gender,
            matricola: req.body.matricola,
            codFacolta: req.body.codFacolta,
            phone: req.body.phone,
        });


        newStudent.save(function (err, student) {
            if (err) {
                if (err = existing) {
                    res.json({ success: false, message: "account già esistente" })
                }
                res.json({ success: false, message: "errore" })
            }

            if (student) {
                res.json({ success: true, message: 'Ok! Student account has been created successfully' });
            }
        })
    }

};

//funzionante
exports.loginStudent = function (req, res) {

    Student.findOne({
        username: req.body.username
    },
        function (err, student) {
            if (!req.body.username) {
                return res.json({ state: false, message: 'password is required' });
            }

            if (err)
                return res.json({ success: false, msg: 'errore durante il login,riprovare' });
            if (!student) {
                return res.json({ success: false, msg: 'Autenticazione fallita,account non trovato' });

            } else {

                // check if password matches
                student.comparePassword(req.body.password, function (err, isMatch) {
                    if (!req.body.password) {
                        return res.json({ state: false, message: 'password is required' });
                    }

                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(student, process.env.SECRET);
                        // return the information including token as JSON

                        return res.json({ success: true, token: 'JWT ' + token });

                    } else {
                        return res.json({ success: false, msg: 'Autenticazione fallita, password errata.' });
                    }
                });
            }
        });
};

exports.mostraCorsiStu = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
          

                Corso.find({
                    codFacolta: stu.codFacolta

                }, function (err, corso) {
                    if (err) {

                        return res.json({ msg: '' + err })
                    }
                    else

                        return res.json({ msg: corso })
                })
            
        }
            )
    } else {
        return res.json({ msg: 'token non valido' })
    }
}


//DA VERIFICARE
exports.mostraCorsi = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            else if (stu.ruolo == 'student') {

                Corso.find({}, function (err, corso) {
                    if (err) {

                        return res.json({ msg: '' + err })
                    }
                    else

                        return res.json({ msg: corso })
                })
            }
        }
            )
    } else {
        return res.json({ msg: 'token non valido' })
    }
}

/* //funzionante
exports.PianoDiStudi = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,

        }).exec(function (err, prof) {
            if (err)

                return res.json({ success: false, msg: 'il token non è valido' });
            if (!prof)
                return res.json({ success: true, msg: 'non sei un student' });
            if (prof) {
                var use = prof.codFacolta
                Corso.find({
                    codFacolta: use
                    
                }).exec(function (err, corso) {
                    if (err)
                        return res.json({ success: false, msg: 'il token non è valido' });
                    if (!corso)
                        return res.json({ success: true, msg: 'admin' });
                    if (corso) {
                        return res.json({ success: true, msg: corso })
                    }
                })
            }
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}
 */
exports.valori = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            if (!stu)
                return res.json({ success: false, msg: 'appello non trovato' });
            if (stu) {

                var a = stu.esamifatti;

                var tuttiivoti = new Array()
                if (a.esito !== "null") {
                    //qui ci sono gli esami che lo studente ha passato
                    var b = stu.esamifatti.length //vedo quanti sonoù
                    console.log("sono" + b)
                    var sommacfu = 0;
                    var sommavoti = 0;
                    var mediapond = 0;
                    var i = 0
                    var etichette = new Array()
                    var eccoli = new Array()

                    for (i = 0; i < b; i++) {
                        eccoli[i + 3] = stu.esamifatti[i].esito //è un array in cui dall'elemento 3 ci sono tutti i voti dello studente agli esami 
                        //  etichette[i] = stu.esamifatti[i].nome
                        sommacfu = sommacfu + stu.esamifatti[i].cfu; //LA SOMMA DEI CFU CHE LO STUDENTE HA
                        sommavoti = sommavoti + stu.esamifatti[i].esito //QUESTI SONO I SINGOLI VOTI
                        mediapond = mediapond + stu.esamifatti[i].cfu * stu.esamifatti[i].esito
                    }
                    var j = 0
                    var finale = new Array(b)
                    var media = sommavoti / b; //QUESTA È LA MEDIA ARITMETICA DEI VOTI 
                    var media2 = mediapond / sommacfu; //MEDIA PONDERATA FINALE DEI VOTI

                    eccoli[0] = media, eccoli[1] = media2, eccoli[2] = sommacfu
                    console.log(eccoli)
                    return res.json({ success: true, msg: eccoli })
                }
            }
        })
    }
}

exports.valori2 = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            if (!stu)
                return res.json({ success: false, msg: 'appello non trovato' });
            if (stu) {

                var a = stu.esamifatti;

                var tuttiivoti = new Array()
                if (a.esito !== "null") {
                    //qui ci sono gli esami che lo studente ha passato
                    var b = stu.esamifatti.length //vedo quanti sono
                    var i = 0
                    var etichet = new Array()


                    for (i = 0; i < b; i++) {
                        etichet[i] = stu.esamifatti[i].nome

                    }
                    return res.json({ success: true, msg: etichet })
                }
            }
        })
    }
}


//funzionante
/* exports.ricercaCorso = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Corso.find({
            _id: req.body.id,
            codFacolta: req.body.codFacolta
        }).exec(function (err, done) {
            if (err)
                return res.json({ success: false, msg: 'errore durante la ricerca del corso' });
            if (!done)
                return res.json({ success: false, msg: 'corso non esistente' });
            if (done) {
                return res.json({ success: true, msg: 'Ecco il tuo corso ' + done })
            }
        })
    }
    else {
        return res.json({ msg: 'token non valido' })
    }
} */

//FUNZIONANTE MA STAMPA TUTTI I DATI DEL PROFESSORE, BISOGNA RIVEDERLA
/* exports.ricercaProf = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            id: decoded.id,
            nameP: req.body.nameP,
            surname: req.body.surname,
        }).exec(function (err, prof) {
            if (!req.body.nameP) {
                return res.json({ state: false, message: 'name is required' });
            }
            if (!req.body.surname) {
                return res.json({ state: false, message: 'surname is required' });
            }
            if (err)
                return res.json({ success: false, msg: 'errore durante la ricerca del prof' });
            if (!prof)
                return res.json({ success: false, msg: 'prof non esistente' });
            if (prof) {

                return res.json({ success: true, msg: prof })
            }
        })
    }
    else {
        return res.json({ msg: 'token non valido' })
    }
} */

//funzionante
exports.modifyDati = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova studente con quell'id
        Student.findOne({
            _id: decoded._id,
        })
            .exec(function (err, student) {
                if (err)
                    return res.json({ success: false, msg: 'il token non è valido' });
                if (!student)
                    return res.json({ success: false, msg: 'account non trovato' });
                else {
                    if (student) {
                        if (student.ruolo == 'student') {

                            Student.findOneAndUpdate({
                                _id: decoded._id,
                            },
                                {
                                    $set: {
                                        gender: req.body.gender,
                                        email: req.body.email,
                                        phone: req.body.phone,
                                        address: req.body.address,
                                        city: req.body.city,
                                        state: req.body.state,
                                    }
                                },
                                { new: true },

                                function (err, student) {
                                    if (!req.body.email) {
                                        return res.json({ state: false, message: 'email is required' });
                                    }
                                    if (!req.body.phone) {
                                        return res.json({ state: false, message: 'phone is required' });
                                    }
                                    if (!req.body.address) {
                                        return res.json({ state: false, message: 'address is required' });
                                    }
                                    if (!req.body.city) {
                                        return res.json({ state: false, message: 'city is required' });
                                    }
                                    if (!req.body.state) {
                                        return res.json({ state: false, message: 'state is required' });
                                    }
                                    if (err)
                                        return res.json({ success: false, msg: 'errore durante la riceca dello studente' + err });
                                    if (!student)
                                        return res.json({ success: false, msg: 'studente non esistente' });
                                    if (student) {
                                        return res.json({ success: true, msg: 'studente modificato' });
                                    }
                                })
                        } else {
                            return res.json({ success: false, msg: 'non sei uno studente' });
                        }

                    }
                }

            })
    }
}

exports.iscrivitiAppello = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova studente con quell'id
        Student.findOne({
            _id: decoded._id,
        })
            .exec(function (err, student) {
                if (err)
                    return res.json({ success: false, msg: 'il token non è valido' });
                if (!student)
                    return res.json({ success: false, msg: 'account non trovato' });
                else {
                    if (student) {
                        if (student.ruolo == 'student') {
                            Appello.findOne({
                                _id: req.body._id,
                                //codFacolta: student.codFacolta,
                                aperto: true,
                            }).exec(function (err, appello) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                                if (!appello)
                                    return res.json({ success: false, msg: 'appello non esistente o chiuso.' + err });
                                if (appello) {
                                    var ciao = true;
                                    Elenco.findOne({
                                        esame: appello.esame,

                                        accountid: student.matricola,
                                 

                                    }).exec(function (err, elenco) {
                                        if (err)
                                            return res.json({ success: false, msg: 'errore durante la ricerca' });
                                        if (elenco)
                                            return res.json({ success: false, msg: 'sei già iscritto o hai gia accettato il voto di questa materia' });
                                        if (!elenco) {
                                           
                                            var NewElenco = new Elenco({
                                                appelloid: appello.id,
                                                accountid: student.matricola,
                                                nome: student.name,
                                                cognome: student.surname,
                                                esame: appello.esame,
                                                dataApp: appello.dataApp,
                                                ora: appello.ora,
                                                voto_provvisorio: 'non ancora caricato',
                                                conferma: false,
                                                accettato: false,
                                                voto_definitivo: 'non confermato',
                                            })
                                            NewElenco.save(function (err, elenco) {

                                                if (err)
                                                    return res.json({ success: false, msg: err + 'errore non è stato possibile salvare il nuovo elenco' });
                                                if (!elenco) {
                                                    return res.json({ success: false, msg: "sei iscritto all'appello" })
                                                }
                                                if (elenco) {
                                                    var n = appello.iscritti + 1;

                                                    Appello.findOneAndUpdate({
                                                        _id: req.body._id
                                                    },
                                                        {
                                                            $set: {
                                                                iscritti: n
                                                            }
                                                        }, { new: true }, function (err, appello) {
                                                            if (err) {
                                                                // deleteElenco(elenco._id)
                                                                return res.json({ success: false, msg: 'errore durante l iscrizione' });
                                                            }
                                                            if (!appello)
                                                                return res.json({ success: false, msg: 'appello non trovato' });
                                                            if (appello)
                                                                return res.json({ success: true, msg: 'Iscrizione riuscita con successo!' });
                                                        })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }

                }
            })



    } else {
        return res.json({ success: false, msg: 'Autorizzazione non valida' });
    }

}
//FUNZIONANTE
exports.mostraAppelli = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, student) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!student)
                return res.json({ success: false, msg: 'account non trovato' });
            if (student) {

                Appello.find({


                }).exec(function (err, appello) {
                    if (err)
                        return res.json({ success: false, msg: 'il token non è valido' });
                    if (!appello)
                        return res.json({ succes: true, msg: 'appello' });
                    if (appello) {
                        return res.json({ succes: true, msg: appello })
                    }
                })
            }
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}


exports.cancellaPrenotazione = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova studente con quell'id
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, student) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!student)
                return res.json({ success: false, msg: 'account non trovato' });
            else {
                if (student) {
                    if (student.ruolo == 'student') {
                        Appello.findOne({ //cerco un appello con id passato
                            _id: req.body._id,
                            //  codFacolta: student.codFacolta,
                            aperto: true,

                        }).exec(function (err, appello) {
                            if (err)
                                return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                            if (!appello)
                                return res.json({ success: false, msg: 'appello non esistente o chiuso.' });
                            if (appello) {
                                Elenco.findOne({
                                    appelloid: req.body._id,
                                    accountid: student.matricola,
                                    accettato: false
                                }).exec(function (err, elenco) {
                                    if (err)
                                        return res.json({ success: false, msg: 'errore durante la ricerca' });
                                    if (!elenco)
                                        return res.json({ success: false, msg: 'non puoi cancellarti sei non sei iscritto o hai gia accettato il voto' });
                                    if (elenco) {
                                        removeEl(elenco._id)
                                        //  removeA(student.matricola)

                                        var n = appello.iscritti - 1;
                                        Appello.findOneAndUpdate({
                                            _id: req.body._id
                                        },
                                            {
                                                $set: {
                                                    iscritti: n
                                                }
                                            }, { new: true }, function (err, appello) {
                                                if (err) {
                                                    // deleteElenco(elenco._id)
                                                    return res.json({ success: false, msg: 'errore durante l\'iscrizione' });
                                                }
                                                if (!appello)
                                                    return res.json({ success: false, msg: 'appello non trovato' });
                                                if (appello)
                                                    return res.json({ success: true, msg: 'cancellazione riuscita con successo!' });
                                            })

                                    }

                                }
                                    )
                            }
                        })
                    } else { return res.json({ msg: 'non sei uno studente' }) }
                }
            }
        })
    }
}

//funzionante
exports.showUsernameProf = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            else if (stu.ruolo == 'student') {

                Prof.find({}, function (err, prof) {
                    if (err) {

                        return res.json({ msg: '' + err })
                    }
                    else

                        return res.json({ msg: prof })
                })
            }
        }
            )
    } else {
        return res.json({ msg: 'token non valido' })
    }
}



exports.mostraRisultati = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id
        }).exec(function (err, currentaccount) {
            if (err) {
                return res.json({ success: false, msg: 'non sei autorizzato' });
            }
            if (!currentaccount) {
                return res.json({ success: false, msg: 'profilo di ' + decoded.name + 'non trovato.' });
            } else {
                Elenco.find({
                    accountid: currentaccount.matricola,
                    conferma: false
                }).exec(function (err, result) {
                    if (err)
                        return res.json({ success: false, msg: 'non è stato possibile trovare i tuoi risultati' });
                    if (!result)
                        return res.json({ success: false, msg: 'non è stato trovato alcun voto' });
                    if (result)
                        return res.json({ success: true, msg: result })
                })
            }
        })
    } else {
        return res.json({ success: false, msg: 'non sei loggato' });
    }
}

exports.valori = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            if (!stu)
                return res.json({ success: false, msg: 'appello non trovato' });
            if (stu) {
                ExamPassed.find({
                    matricolastud: stu.matricola
                }).exec(function (err, exam) {
                    if (exam) {


                        var tuttiivoti = new Array()

                        //qui ci sono gli esami che lo studente ha passato
                        var b = exam.length //vedo quanti sono
                        var sommacfu = 0;
                        var sommavoti = 0;
                        var mediapond = 0;
                        var i = 0
                        var etichette = new Array()
                        var eccoli = new Array()

                        for (i = 0; i < b; i++) {
                            eccoli[i + 3] = exam[i].esito //è un array in cui dall'elemento 3 ci sono tutti i voti dello studente agli esami 
                            //  etichette[i] = stu.esamifatti[i].nome
                            sommacfu = sommacfu + exam[i].cfu; //LA SOMMA DEI CFU CHE LO STUDENTE HA
                            sommavoti = sommavoti + exam[i].esito //QUESTI SONO I SINGOLI VOTI
                            mediapond = mediapond + exam[i].cfu * exam[i].esito
                        }
                        var j = 0
                        var finale = new Array(b)
                        var media = sommavoti / b; //QUESTA È LA MEDIA ARITMETICA DEI VOTI 
                        var media2 = mediapond / sommacfu; //MEDIA PONDERATA FINALE DEI VOTI
                        console.log(sommacfu)
                        eccoli[0] = media, eccoli[1] = media2, eccoli[2] = sommacfu
                        return res.json({ success: true, msg: eccoli })

                    }
                })

            }
        })
    }
}

exports.valori2 = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            if (!stu)
                return res.json({ success: false, msg: 'appello non trovato' });
            if (stu) {


                ExamPassed.find({
                    matricolastud: stu.matricola
                }).exec(function (err, exam) {
                    var tuttiivoti = new Array()

                    //qui ci sono gli esami che lo studente ha passato
                    var b = exam.length //vedo quanti sono
                    var i = 0
                    var etichet = new Array()


                    for (i = 0; i < b; i++) {
                        etichet[i] = exam[i].nome
                    }
                    console.log(etichet)
                    return res.json({ success: true, msg: etichet })

                })


            }
        })
    }
}

exports.confermaVoto = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, student) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!student)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (student)

                Elenco.findOne({
                    _id: req.body._id
                }).exec(function (err, elenco) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell elenco' });
                    }
                    if (!elenco)

                        return res.json({ success: false, msg: req.body._id });
                    if (elenco)
                        Appello.findOne({
                            _id: elenco.appelloid
                        }).exec(function (err, appello) {
                            if (err)

                                return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                            if (!appello)

                                return res.json({ success: false, msg: 'appello non trovato' });
                            if (appello) {


                                Corso.findOne({
                                    nome: appello.esame
                                }).exec(function (err, corso) {
                                    if (err)

                                        return res.json({ success: false, msg: 'errore durante la ricerca dell\'elenco' });
                                    if (!corso)


                                        return res.json({ success: false, msg: 'iscrizione non trovato' });

                                    if (corso) {

                                        Elenco.findOneAndUpdate({
                                            accountid: student.matricola,
                                            esame: elenco.esame,

                                            conferma: false,
                                            accettato: false,
                                        }, {
                                                $set: {
                                                    voto_definitivo: elenco.voto_provvisorio,
                                                    conferma: true,
                                                    accettato: true,
                                                }
                                            }, { new: true }, function (err, doc) {
                                                if (err) {

                                                    return res.json({ success: false, msg: 'errore durante la conferma del voto' });
                                                }
                                                if (!doc) {

                                                    return res.json({ success: false, msg: 'hai gia effettuato l esame' });
                                                }
                                                if (doc) {
                                                    console.log(appello._id)
                                                    console.log(student.matricola)
                                                    console.log(elenco.esame)

                                                    var NewExamPassed = new ExamPassed({
                                                        nome: appello.esame,
                                                        dataApp: elenco.dataApp,
                                                        esito: elenco.voto_provvisorio,
                                                        codCorso: corso.codice,
                                                        cfu:  corso.cfu,
                                                        matricolastud: elenco.accountid,
                                                    })
                                                    NewExamPassed.save(function (err, exam) {


                                                        if (err) {
                                                            return res.json({ success: false, msg: err + 'errore non è stato possibile salvare il nuovo voto' });
                                                        }
                                                        if (!exam)
                                                            return res.json({ success: false, msg: "hai gia sostenuto l esame" })

                                                        if (exam)
                                                            return res.json({ success: false, msg: "voto Salvato" })


                                                    })

                                                }
                                            })
                                    }
                                })

                            }
                        })
                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

exports.Carriera = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {
            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            if (!stu)
                return res.json({ success: false, msg: 'studente  non trovato' });
            if (stu) {
                ExamPassed.find({

                    matricolastud: stu.matricola
                }).exec(function (err, elenco) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell elenco' });
                    }
                    if (!elenco)

                        return res.json({ success: false, msg: 'ci sta qualche problema' });
                    if (elenco)
                        return res.json({ success: false, msg: elenco })
                })



            }
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

exports.showProfileStudent = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, student) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!student)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (student)
                return res.json({ student })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}



//funzioni secondarie
removeEl = function (elenco) {
    Elenco.remove({
        _id: elenco
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione dell\'elenco, contattare un amministratore' });

    })
}