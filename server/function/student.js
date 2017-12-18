Student = require('../models/student');
Facolta = require('../models/facolta');
Corso = require('../models/corsi');
Appello = require('../models/appello');
Elenco = require('../models/elencostudenti');

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

//funzionante
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
                console.log(stu.esamifatti)
                var a = stu.esamifatti;
                var  tuttiivoti = new Array[i]
                if (a.esito !== "null") {
                    //qui ci sono gli esami che lo studente ha passato
                    var b = stu.esamifatti.lenght //vedo quanti sono e faccio la media
                   for(i=0;i<b;i++){
                    var sommavoti = stu.esamifatti //QUESTI SONO I SINGOLI VOTI
                   tuttiivoti[i]=sommavoti //   QUI CI SONO I VOTI SINGOLI PER OGNI ESAMI
                   }
                   var media = sommavoti /b; //QUESTA È LA MEDIA aritmetica DEI VOTI 



                }
            }
        }
            )
    }
}


//funzionante
exports.ricercaCorso = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        /** Ricerca dei corsi in base alla facoltà e l'id*/
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
}

//FUNZIONANTE MA STAMPA TUTTI I DATI DEL PROFESSORE, BISOGNA RIVEDERLA
exports.ricercaProf = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        /** Ricerca dei corsi in base alla facoltà e l'id*/
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
}

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
                                    var appelloid = req.body._id /* ="59e8bed242f6fce9d8b89c20" */
                                    var accountid = student.matricola /* = "093456" */
                                    Elenco.findOne({
                                        appelloid: req.body._id,
                                        accountid: student.matricola,
                                        accettato:false
                                    }).exec(function (err, elenco) {
                                        if (err)
                                            return res.json({ success: false, msg: 'errore durante la ricerca' });
                                        if (elenco)
                                            return res.json({ success: false, msg: 'sei già iscritto o hai gia accettato il voto' });
                                        if (!elenco) {
                                            var NewElenco = new Elenco({
                                                appelloid: appello.id,
                                                accountid: student.matricola,
                                                nome: student.name,
                                                cognome: student.surname,
                                                esame: appello.esame,
                                                data: appello.data,
                                                ora: appello.ora,
                                                voto_provvisorio: 'null',
                                                conferma: false,
                                                accettato: false,
                                                voto_definitivo: 'null',
                                            })
                                            NewElenco.save(function (err, elenco) {
                                                /*  if (!req.body.matricola) {
                                                     return res.json({ success: false, message: 'matricola is required' });
                                                 }
                                                 if (!req.body.name) {
                                                     return res.json({ success: false, message: 'name is required' });
                                                 }
                                                 if (!req.body.surname) {
                                                     return res.json({ success: false, message: 'surname is required' });
                                                 }
                                                 if (!req.body.esame) {
                                                     return res.json({ success: false, message: 'esame is required' });
                                                 }
                                                 if (!req.body.data) {
                                                     return res.json({ success: false, message: 'data is required' });
                                                 }
                                                 if (!req.body.ora) {
                                                     return res.json({ success: false, message: 'ora is required' });
                                                 }
                                                 */
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
                                                                return res.json({ success: false, msg: 'errore durante l\'iscrizione' });
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
                                    accettato:false
                                }).exec(function (err, elenco) {
                                    if (err)
                                        return res.json({ success: false, msg: 'errore durante la ricerca' });
                                    if (!elenco)
                                        return res.json({ success: false, msg: 'non puoi cancellarti sei non sei iscritto o hai gia accettato il voto' });
                                    if (elenco) {
                                        removeEl(elenco._id)
                                        //  removeA(student.matricola)
                                       
                                     var n = appello.iscritti - 1 ;
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
                    accountid:currentaccount.matricola,
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

//C'È  DA FINIRE LA FUNZIONE AGGIORNANDO
//IL MODELLO DEGLI ESAMI PASSATI DELLO STUDENTE
//CON QUELLO CHE HA APPENA VERBALIZZATO
exports.confermaVoto = function (req, res) {
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
                Appello.findOne({
                    _id: req.body._id,
                }).exec(function (err, appello) {
                    if (err)
                        return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                    if (!appello)
                        return res.json({ success: false, msg: 'appello non trovato' });
                    if (appello)
                        Elenco.findOne({
                            accountid: currentaccount.matricola,
                            appelloid: appello._id
                        }).exec(function (err, elenco) {
                            if (err)
                                return res.json({ success: false, msg: 'errore durante la ricerca dell\'elenco' });
                            if (!elenco)
                                return res.json({ success: false, msg: 'iscrizione non trovato' });
                            if (elenco) {
                                var voto = elenco.voto_provvisorio == null
                                var nulla = !null;
                                if (voto == true)
                                    return res.json({ success: false, msg: 'non è ancora stato caricato nessun voto' });
                                if (voto == false) {
                                    Elenco.findOneAndUpdate({
                                        accountid: currentaccount.matricola,
                                        appelloid: appello._id,
                                        conferma: false,
                                        accettato: false,
                                    }, {
                                            $set: {
                                                voto_definitivo: elenco.voto_provvisorio,
                                                conferma: true,
                                                accettato: true,
                                            }
                                        }, { new: true }, function (err, doc) {
                                            if (err)
                                                return res.json({ success: false, msg: 'errore durante la conferma del voto' });
                                            if (doc) {
                                                return res.json({ success: true, msg: 'voto confermato' });
                                            }
                                        }

                                        //C'È  DA FINIRE LA FUNZIONE AGGIORNANDO
                                        //IL MODELLO DEGLI ESAMI PASSATI DELLO STUDENTE
                                        //CON QUELLO CHE HA APPENA VERBALIZZATO
                                    )
                                }
                            }
                        })
                })
            }
        })
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