Admin = require('../models/admin');
Prof = require('../models/professore');
Corso = require('../models/corsi');
Student = require('../models/student');
Facolta = require('../models/facolta');

var jwt = require('jwt-simple');
var bCrypt = require('bcrypt-nodejs');
var bcrypt = require('bcrypt');



//function to hash passwords
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//funzionante
exports.addAnotherAdmin = function (req, res, next) {
    /* if (!req.body.name || !req.body.surname) {
        return res.json({ state: false, message: 'name and surname are required' });
    }
 */

    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

        Admin.findOne({
            _id: decoded._id,
        }).exec(function (err, admin) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!admin)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (admin) {
                if (admin.ruolo == 'admin') {

                    if (!req.body.password || !req.body.username) {
                        return res.json({ state: false, message: 'username and password are required' });
                    }

                    /* if (!req.body.email) {
                        return res.json({ state: false, message: 'email is required' });
                    }
                    if (!req.body.state || !req.body.city) {
                        return res.json({ state: false, message: 'state and city are required' });
                    }
                
                    if (!req.body.phone) {
                        return res.json({ state: false, message: 'phone is required' });
                    }
                
                    if (!req.body.address) {
                        return res.json({ state: false, message: 'address is required' });
                    } */
                    else {

                        Admin.findOne({
                            username: req.body.username,
                            password: req.body.password,
                        }).exec(function (err, verify) {
                            if (err)
                                return res.json({ msg: 'errore durante la verifica dell\' esistenzà dell\' appello' });
                            if (!verify) {

                                var newAdmin = new Admin({
                                    /* name: req.body.name,
                                    surname: req.body.surname,
                                    email: req.body.email, */
                                    username: req.body.username,
                                    password: createHash(req.body.password),
                                    /* state: req.body.state,
                                    city: req.body.city,
                                    address: req.body.address,
                                    phone: req.body.phone, */
                                })
                                newAdmin.save(function (err, admin) {
                                    if (err) {
                                        if (err = 11000) {
                                            res.json({ success: false, msg: 'account già esistente' })
                                        }
                                        res.json({ success: false, msg: 'errore' })
                                    }
                                    if (admin) {
                                        res.json({ success: true, msg: 'Admin account created successfully' })
                                    }
                                })
                            } if (verify)
                                return res.json({ succes: false, msg: 'Admin già esistente' });
                        })
                    }
                } else { return res.json({ msg: 'non sei admin' }) }
            }
        })
    }
}

//funzionante
exports.loginAdmin = function (req, res) {
    Admin.findOne({
        username: req.body.username
    }, function (err, admin) {
        if (err)
            return res.json({ success: false, msg: 'errore durante il login,riprovare' });
        if (!admin) {
            return res.json({ success: false, msg: 'Autenticazione fallita,account non trovato' });
        } else {


            // check if password matches
            admin.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(admin, process.env.SECRET);
                    // return the information including token as JSON
                    return res.json({ success: true, token: 'JWT ' + token });
                } else {
                    return res.json({ success: false, msg: 'Autenticazione fallita, password errata.' });
                }
            });
        }
    });
}

//funzionante
exports.deleteProf = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Admin.findOne({
            _id: decoded._id,
        }).exec(function (err, admin) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!admin)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (admin) {
                if (admin.ruolo == 'admin') {

                    Prof.findOne({
                        _id: req.body.id,
                        username: req.body.username
                    }).exec(function (err, done) {
                        if (err)
                            return res.json({ success: false, msg: 'errore durante la riceca del professore' });
                        if (!done)
                            return res.json({ success: false, msg: 'professore non esistente' });
                        if (done) {
                            deleteP(done._id);
                            return res.json({ success: true, msg: 'professore cancellato' });
                        }
                    })
                }
                else {
                    return res.json({ success: false, msg: 'admin non esistente' })
                }
            }
        })

    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

//funzionante
exports.deleteStudent = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Admin.findOne({
            _id: decoded._id,
        }).exec(function (err, admin) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!admin)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (admin) {
                if (admin.ruolo == 'admin') {

                    Student.findOne({
                        _id: req.body.id,
                        username: req.body.username
                    }).exec(function (err, done) {
                        if (err)
                            return res.json({ success: false, msg: 'errore durante la ricerca dello studente' });
                        if (!done)
                            return res.json({ success: false, msg: 'studente non esistente' });
                        if (done) {
                            deleteS(done._id);
                            return res.json({ success: true, msg: 'studente cancellato' });
                        }
                    })
                }
                else {
                    return res.json({ success: false, msg: 'admin non esistente' })
                }
            }
        })

    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

//funzionante
exports.addCorso = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

        Admin.findOne({
            _id: decoded._id,
        }).exec(function (err, admin) {
            /* if (admin)
 
                return res.json({ success: false, msg: 'il token non è valido' }); */

            if (!admin)
                return res.json({ success: false, msg: 'account non trovato' });

            if (admin) {
                if (admin.ruolo == 'admin') {

                    Corso.findOne({
                        nome: req.body.nome,
                        codFacolta: req.body.codFacolta,
                        codice: req.body.codice,
                        cfu: req.body.cfu,
                        anno: req.body.anno,
                        usernameProf: req.body.usernameProf

                    }).exec(function (err, verify) {
                        if (err)
                            return res.json({ msg: 'errore' });

                        if (!verify) {
                            console.log(verify)
                            var newCorso = new Corso({
                                nome: req.body.nome,
                                codFacolta: req.body.codFacolta,
                                codice: req.body.codice,
                                cfu: req.body.cfu,
                                anno: req.body.anno,
                                usernameProf: req.body.usernameProf,
                            })
                            newCorso.save(function (err, corso) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la creazione dell\'appello' });
                                if (corso)
                                    return res.json({ succes: true, msg: 'corso creato' });
                            })
                        }
                        if (verify)
                            return res.json({ succes: false, msg: ' corso già esistente' });


                    })
                } else {
                    return res.json({ success: false, msg: 'non sei un admin' });
                }

            }
        })

    } else
        return res.json({ succes: false, msg: "problemi col token" });
}

//funzionante
exports.modifyCorso = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova admin con quell'id
        Admin.findOne({
            _id: decoded._id,
        }).exec(function (err, admin) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!admin)
                return res.json({ succes: false, msg: 'account non trovato' });
            else {
                if (admin) {
                    if (admin.ruolo == 'admin') {

                        Corso.findOneAndUpdate({
                            _id: req.body.id,
                        },
                            {
                                $set: {
                                    cfu: req.body.cfu,
                                    usernameProf: req.body.usernameProf,
                                }
                            },
                            { new: true },

                            function (err, corso) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la riceca del corso' + err });
                                if (!corso)
                                    return res.json({ success: false, msg: 'corso non esistente' });
                                if (corso) {
                                    return res.json({ success: true, msg: 'corso modificato' });
                                }
                            })
                    } else {
                        return res.json({ success: false, msg: 'non sei un admin' });
                    }

                }
            }

        })
    }
}

//funzionante
exports.deleteCorso = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Admin.findOne({
            _id: decoded._id,
        }).exec(function (err, admin) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!admin)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (admin) {
                if (admin.ruolo == 'admin') {

                    Corso.findOne({
                        _id: req.body.id,
                        codice: req.body.codice
                    })
                        .exec(function (err, done) {
                            if (err)
                                return res.json({ success: false, msg: 'errore durante la ricerca del corso' });
                            if (!done)
                                return res.json({ success: false, msg: 'corso non esistente' });
                            if (done) {
                                deleteC(done._id);
                                return res.json({ success: true, msg: 'corso cancellato' });
                            }
                        })
                }
                else {
                    return res.json({ success: false, msg: 'corso non esistente' })
                }
            }
        })

    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

//unisce facoltà e corsi FUNZIONE DA VERIFICARE
exports.populateFacolta = function (req, res, codFacolta) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Facolta.findOne({ 'codFacolta': req.body.codFacolta }, function (err, facolta) {
            if (err) throw err;
            Corso.find({ 'codFacolta': req.body.codFacolta }, function (err, corsi) {
                if (err) throw err;
                corsi.forEach(function (corso) {
                    //controllo che non siano già presenti
                    var confronto = facolta.corsi.find(o => o === corso.codice);
                    if (typeof confronto === 'undefined')
                        facolta.corsi.push(corso.codice);
                });
                facolta.save();
                return res.json({ msg: 'facolta popolata' + facolta })
            });
        });
    }
}


//funzionante
exports.deleteAppello = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!prof)
                return res.json({ succes: false, msg: 'account non trovato' });
            if (prof) {
                if (prof.ruolo == 'prof') {
                    Appello.findOne({
                        _id: req.body.id
                    }).exec(function (err, appello) {
                        if (err)
                            return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                        if (!appello)
                            return res.json({ success: false, msg: 'appello non esistente' });
                        if (appello) {

                            deleteA(appello._id);
                            return res.json({ success: true, msg: 'appello cancellato' });
                        }
                    })
                }
                else {
                    return res.json({ success: false, msg: 'professore non esistente' })
                }
            }
        })

    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}























//funzioni esterne richiamate all'interno dei metodi 
deleteA = function (appello) {
    Appello.remove({
        _id: appello
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione dell appello, contattare un amministratore' });
    });
}
deleteC = function (corso) {
    Corso.remove({
        _id: corso
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione del prof, contattare un amministratore' });
    });
}

deleteP = function (prof) {
    Prof.remove({
        _id: prof
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione del prof, contattare un amministratore' });
    });
}

deleteS = function (student) {
    Student.remove({
        _id: student
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione dello studente, contattare un amministratore' });
    });
}

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}