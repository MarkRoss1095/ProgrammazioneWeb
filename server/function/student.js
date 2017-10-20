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
    if (!req.body.name || !req.body.surname) {
        return res.json({ state: false, message: 'name and surname are required' });
    }

    if (!req.body.password || !req.body.username) {
        return res.json({ state: false, message: 'username and password are required' });
    }

    if (!req.body.email) {
        return res.json({ state: false, message: 'email is required' });
    }
    if (!req.body.gender) {
        return res.json({ state: false, message: 'gender is required' });
    }

    if (!req.body.state || !req.body.city) {
        return res.json({ state: false, message: 'state and city are required' });
    }

    if (!req.body.bod) {
        return res.json({ state: false, message: 'date is required' });
    }


    if (!req.body.address) {
        return res.json({ state: false, message: 'address is required' });
    }

    if (!req.body.codFacolta) {
        return res.json({ state: false, message: 'codicefacoltà is required' });
    }

    if (!req.body.matricola) {
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
                    res.json({ success: false, msg: "account già esistente" })
                }
                res.json({ success: false, msg: "errore" })
            }

            if (student) {
                res.json({ success: true, msg: 'Ok! Student account has been created successfully' });
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

            if (err)
                return res.json({ success: false, msg: 'errore durante il login,riprovare' });
            if (!student) {
                return res.json({ success: false, msg: 'Autenticazione fallita,account non trovato' });

            } else {

                // check if password matches
                student.comparePassword(req.body.password, function (err, isMatch) {
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

        /** Ricerca di tutti i corsi disponibili */

        Corso.find({}, function (err, corsi) {
            if (err) {
                console.log('Errore nella ricerca dei corsi ');
                return res.json({ msg: '' + err })
            }
            else
                return res.json({ corsi })
        }).sort('anno');

    } else {
        return res.json({ msg: 'token non valido' })
    }
}

//funzionante
exports.PianoDiStudi = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        /** Ricerca dei corsi in base alla facoltà = equivale a cercare il piano di studio */
        Facolta.findOne({

            codFacolta: req.body.codFacolta
        }).exec(function (err, done) {

            Corso.find({
                //_id: req.body.id,
                codFacolta: req.body.codFacolta
            }).exec(function (err, done) {
                if (err)
                    return res.json({ success: false, msg: 'errore durante la ricerca del corso' });
                if (!done)
                    return res.json({ success: false, msg: 'corso non esistente' });
                if (done) {
                    return res.json({ success: true, msg: 'Ecco il tuo piano di studi' + done })
                }
            })
        })
    }
    else {
        return res.json({ msg: 'token non valido' })
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
            if (err)
                return res.json({ success: false, msg: 'errore durante la ricerca del prof' });
            if (!prof)
                return res.json({ success: false, msg: 'prof non esistente' });
            if (prof) {
                console.log(prof)
                var p = prof;
                return res.json({ success: true, msg: 'Ecco il prof: \n ' + p })
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
                                _id: req.body.id,
                            },
                                {
                                    $set: {
                                        email: req.body.email,
                                        phone: req.body.phone,
                                        address: req.body.address,
                                        city: req.body.city,
                                        state: req.body.state,
                                    }
                                },
                                { new: true },

                                function (err, student) {
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
                                _id: req.body.id,
                                //codFacolta: student.codFacolta,
                                aperto: true,
                            }).exec(function (err, appello) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                                if (!appello)
                                    return res.json({ success: false, msg: 'appello non esistente o chiuso.' + err });
                                if (appello) {
                                    Elenco.findOne({
                                        appello_id: appello._id,
                                        account_id: student.matricola,

                                    }).exec(function (err, elenco) {
                                        if (err)
                                            return res.json({ success: false, msg: 'errore durante la ricerca' });
                                        if (elenco)
                                            return res.json({ success: false, msg: 'sei già iscritto' });
                                        if (!elenco) {
                                            var NewElenco = new Elenco({
                                                appello_id: appello.id,
                                                account_id: student.matricola,
                                                nome: student.name,
                                                cognome: student.surname,
                                                esame: appello.esame,
                                                data: appello.data,
                                                ora: appello.ora,
                                                voto_provvisorio: null,
                                                conferma: false,
                                                accettato: false,
                                                voto_definitivo: null,
                                            })

                                            NewElenco.save(function (err, elenco) {
                                                if (err)
                                                    return res.json({ success: false, msg: 'errore' });
                                                if (elenco) {
                                                    var n = appello.iscritti + 1;

                                                    Appello.findOneAndUpdate({
                                                        corso: student.corso,
                                                        _id: req.body.id
                                                    },
                                                        {
                                                            $set: {
                                                                number_iscritti: n
                                                            }
                                                        }, { new: true }, function (err, appello) {
                                                            if (err) {
                                                                // deleteElenco(elenco._id)
                                                                return res.json({ success: false, msg: 'errore durante l\'iscrizione' });
                                                            }
                                                            if (!appello)
                                                                return res.json({ success: false, msg: 'appello non trovato' });
                                                            if (appello)
                                                                return res.json({ success: true, msg: 'iscrizione riuscita' });
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
                            _id: req.body.id,
                            //  codFacolta: student.codFacolta,
                            // aperto: true,
                        }).exec(function (err, appello) {
                            if (err)
                                return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                            if (!appello)
                                return res.json({ success: false, msg: 'appello non esistente.' });
                            if (appello) {
                                Elenco.findOne({
                                    appello_id: appello._id,
                                    account_id: student.matricola,
                                }).exec(function (err, elenco) {
                                    if (err)
                                        return res.json({ success: false, msg: 'errore durante la ricerca' });
                                    if (!elenco)
                                        return res.json({ success: false, msg: 'non puoi cancellarti sei non sei iscritto' });
                                    if (elenco) {
                                        removeEl(elenco._id)
                                        //  removeA(student.matricola)
                                        return res.json({ success: true, msg: 'prenotazione cancellata' });
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
exports.showAppelli = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

        Student.findOne({
            _id: decoded._id,
        }).exec(function (err, stu) {



            if (err)
                return res.json({ success: false, msg: 'non è stato possibile trovare il profilo dello studente' });
            else {
                Prof.findOne({
                    username: req.body.username
                }).exec(function (err, prof) {
                    if (err) return res.json({ msg: 'professore non esistente' })
                    else {
                        var o = prof

                        Appello.find({
                            //_id: req.body._id, //per prendere l'id dell'appello
                            username_prof: o.username,
                        }).exec(function (err, appello) {
                            if (err)
                                return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                            if (!appello)
                                return res.json({ success: false, msg: 'appello non esistente' });
                            if (appello) {
                                return res.json({ success: true, msg: 'appelli: ' + appello });
                            }
                        })
                    }
                })
            }
        })

    } else {
        return res.json({ success: false, msg: 'non sei un professore' });
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
                
                Prof.find({}, function (err, pr) {
                    if (err) {
                       // console.log('Errore nella ricerca dei prof ');
                        return res.json({ msg: '' + err })
                    }
                    else
                  
                        return res.json({ pr })
                }).sort('nameP');
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
                    account_id: currentaccount.account_id,
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
            account_id: decoded._id
        }).exec(function (err, currentaccount) {
            if (err) {
                return res.json({ success: false, msg: 'non sei autorizzato' });
            }
            if (!currentaccount) {
                return res.json({ success: false, msg: 'profilo di ' + decoded.name + 'non trovato.' });
            } else {
                Appello.findOne({
                    _id: req.body.id,
                }).exec(function (err, appello) {
                    if (err)
                        return res.json({ success: false, msg: 'errore durante la ricerca dell\'appello' });
                    if (!appello)
                        return res.json({ success: false, msg: 'appello non trovato' });
                    if (appello)
                        Elenco.findOne({
                            account_id: currentaccount.account_id,
                            appello_id: appello._id
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
                                        account_id: currentaccount.account_id,
                                        appello_id: appello._id,
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





//funzioni secondarie
removeEl = function (elenco) {
    Elenco.remove({
        _id: elenco
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione dell\'elenco, contattare un amministratore' });

    })
}