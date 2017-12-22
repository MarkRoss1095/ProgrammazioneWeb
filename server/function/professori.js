
//import models
Student = require('../models/student');
Prof = require('../models/professore');
Appello = require('../models/appello');
var bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');
// variabili
var key = 'test'
var jwt = require('jwt-simple');
var moment = require('moment-timezone');
var a = false;

// ALTRE FUNZIONI
/**Funzione per criptare la password nel db */
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    } else {
        return null;
    }
}
// FUNZIONI PRINCIPALI

//funzionante

//funzionante
exports.loginProf = function (req, res) {
    Prof.findOne({
        username: req.body.username
    }, function (err, prof) {
        if (!req.body.username) {
            return res.json({ state: false, message: 'username is required' });
        }
        if (err)
            return res.json({ success: false, msg: 'errore durante il login,riprovare' });
        if (!prof) {
            return res.json({ success: false, msg: 'Autenticazione fallita,account non trovato' });
        } else {
            // check if password matches
            prof.comparePassword(req.body.password, function (err, isMatch) {
                if (!req.body.password) {
                    return res.json({ state: false, message: 'password is required' });
                }
                if (isMatch && !err) {

                    // if user is found and password is right create a token
                    var token = jwt.encode(prof, process.env.SECRET);

                    // return the information including token as JSON

                    return res.json({ success: true, token: 'JWT ' + token });
                } else {

                    return res.json({ success: false, msg: 'Autenticazione fallita, password errata.' });
                }
            });
        }
    });
};


//funzionante
exports.addAppello = function (req, res) {
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
                    var timestamp = req.body.dataApp;
                    var date = moment.tz(timestamp, "Europe/Amsterdam");
                    var date = date.format().toString();
                    var x = date.substr(0, 10); // THIS IS DATA

                    var ora = req.body.ora;
                    var time = moment.tz(ora, "Europe/Amsterdam");
                    var time = time.format().toString();
                    var y = time.substring(11, 16);

                    var anni = parseInt(x.slice(0, 4))
                    var mesi = parseInt(x.slice(5, 7))
                    var giorni = parseInt(x.slice(8, 11))

                    var today = new Date()
                    console.log(today)
                    /*  var today= today.toString().substring(0,11) */
                    var oggigiorno = parseInt(today.getDate())
                    var oggimese = parseInt(today.getMonth() + 1)
                    var oggianno = parseInt(today.getFullYear())
                    var today = oggianno + "-" + oggimese + "-" + oggigiorno

                    Appello.findOne({
                        esame: req.body.esame,
                        dataApp: x,
                    }).exec(function (err, verify) {
                        if (!req.body.esame) {
                            return res.json({ state: false, msg: 'esame is required' });
                        }

                        if (!req.body.dataApp) {
                            return res.json({ state: false, msg: 'data is required' });
                        }
                        if (!req.body.ora) {
                            return res.json({ state: false, msg: 'ora is required' });
                        }

                        if (today < x) {
                            console.log("controllo: buon esito")
                        }
                        console.log(today)
                        if (today == x) {
                            return res.json({ msg: "Non puoi inserire la data di oggi" })
                        }

                        if (today > x) {
                            return res.json({ msg: "la data inserita non è valida. E' precedente a quella corrente" })
                        }

                        if (err)
                            return res.json({ msg: 'errore durante la verifica dell\' esistenzà dell\' appello' });
                        if (!verify) {
                            var newAppello = new Appello({

                                esame: req.body.esame,
                                dataApp: x,
                                ora: y,
                                username_prof: decoded.username,
                                codFacolta: decoded.codFacolta,
                            })
                            newAppello.save(function (err, appello) {

                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la creazione dell\'appello' });
                                if (appello)

                                    return res.json({ succes: true, msg: 'appello creato correttamente' });
                            })
                        } if (verify)
                            return res.json({ succes: false, msg: 'appello già esistente' });
                    })
                }
            } else {
                return res.json({ success: false, msg: 'non sei un professore' });
            }
        })
    } else
        return res.json({ succes: false, msg: "problemi col token" });
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
                        _id: req.body._id
                    }).exec(function (err, appello) {
                        if (err)
                            return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                        if (!appello)
                            return res.json({ success: false, msg: 'appello non esistente' });
                        if (appello) {
                            // deleteAllElenco(appello._id);
                            deleteAp(appello._id);
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

//function richiamata all'interno di deleteAppello
deleteAp = function (appello) {
    Appello.remove({
        _id: appello
    }, function (err) {
        if (err)
            res.status(400).send({ success: false, msg: 'errore durante la cancellazione dell\'elenco, contattare un amministratore' });
    });
}

//funzionante
exports.editAppello = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova admin con quell'id
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });

            if (!prof)
                return res.json({ succes: false, msg: 'account non trovato' });
            else {
                if (prof) {
                    if (prof.ruolo == 'prof') {

                        var timestamp = req.body.dataApp;
                        var date = moment.tz(timestamp,"YYYY-M-D", "Europe/Amsterdam");
                        var date = date.format().toString();
                        var x = date.substr(0, 10); // THIS IS DATA

                        var ora = req.body.ora;
                        var time = moment.tz(ora,"H:m", "Europe/Amsterdam");
                        var time = time.format().toString();
                        var y = time.substring(11, 16); //this is ORA 
                        var today = new Date()
                      
                     
                       //  var today= today.toString().substring(0,11)
                        var oggigiorno = today.getDate()
                        oggigiorno = parseInt(oggigiorno)
                        var oggimese = today.getMonth() 
                        oggimese = parseInt(oggimese) +1 
                        var oggianno = today.getFullYear()
                        oggianno = parseInt(oggianno)
                        
                        var today = oggianno + "-" + oggimese + "-" + oggigiorno

                        console.log("ora"+today)
                        console.log("dopo"+x)



                        if (today < x) {
                            console.log("controllo: buon esito")
                        }
                        console.log(today)
                        if (today == x) {
                            return res.json({ msg: "Non puoi inserire la data di oggi" })
                        }

                        if (today > x) {
                            return res.json({ msg: "la data inserita non è valida. E' precedente a quella corrente" })
                        } 

                        Appello.findOneAndUpdate({
                            _id: req.body._id,
                            aperto: true
                        },
                            {
                                $set: {
                                    esame: req.body.esame,
                                    ora: y,
                                    dataApp: x,
                                    iscritti: req.body.iscritti,
                                    aperto: req.body.aperto,

                                }
                            },
                            { new: true },
                            function (err, appello) {
                                if (err) {
                                    if (appello.aperto = false) return res.json({ success: false, msg: 'Non puoi modificare un appello chiuso!' + err });

                                    return res.json({ success: false, msg: 'errore durante la riceca del appello.' + err });
                                } if (appello) {

                                    return res.json({ success: true, msg: 'appello modificato' });

                                }
                            })
                    } else {
                        return res.json({ success: false, msg: 'non sei un prof' });
                    }

                }
            }

        })
    }
}
exports.searchCorsoForProf = function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!prof)
                return res.json({ success: false, msg: 'account nonnnnnnn trovato' });
            if (prof)
                Corso.findOne({
                    _id: req.body._id
                }).exec(function (err, corso) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca del corso' });
                    }
                    if (!corso)
                        return res.json({ success: false, msg: 'corso non trovato47856' });
                    if (corso)
                        currentcorso = corso;
                    return res.json({ success: false, msg: 'corso trovato' });

                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }

}
exports.viewcorso2 = function (req, res) {
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
            if (prof)
                Corso.findOne({
                    _id: currentcorso._id
                }).exec(function (err, corso) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell appello' });
                    }
                    if (!corso)
                        return res.json({ success: false, msg: 'appello non trovato' });
                    if (corso)
                        console.log(corso)
                    return res.json({ success: false, msg: corso });
                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }

}
exports.ShowAppelliProf = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,

        }).exec(function (err, prof) {
            if (err)

                return res.json({ success: false, msg: 'il token non è valido' });
            if (!prof)
                return res.json({ success: true, msg: 'non sei un prof' });
            if (prof) {
                var use = prof.username
                Corso.find({
                    usernameProf: use
                }).exec(function (err, corso) {
                    if (err)
                        return res.json({ success: false, msg: 'il token non è valido2' });
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

exports.showAppelli = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,

        }).exec(function (err, prof) {
            if (err)

                return res.json({ success: false, msg: 'il token non è valido' });
            if (!prof)
                return res.json({ success: true, msg: 'non sei un prof' });
            if (prof) {
                var use = prof.username
                Appello.find({
                    username_prof: use
                }).exec(function (err, appello) {
                    if (err)
                        return res.json({ success: false, msg: 'il token non è valido2' });
                    if (!appello)
                        return res.json({ success: true, msg: 'admin' });
                    if (appello) {

                        return res.json({ success: true, msg: appello })
                    }
                })
            }
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

exports.chiudiAppello = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, account) {
            if (err)
                return res.json({ success: false, msg: 'token non valido' });
            else {
                if (account.ruolo == 'prof') {
                    Prof.findOne({
                        account_id: decoded._id,
                    }).exec(function (err, prof) {
                        if (err)
                            return res.json({ success: false, msg: 'non è stato possibile trovare il profilo del professore' });
                        else {
                            Appello.findOneAndUpdate({
                                _id: req.body._id
                            }, {
                                    $set: {
                                        aperto: false,
                                    }
                                }, { new: true }, function (err, appello) {
                                    if (err)
                                        return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                                    if (!appello)
                                        return res.json({ success: false, msg: 'appello non esistente' });
                                    if (appello) {
                                        return res.json({ success: true, msg: 'appello chiuso' });
                                    }
                                })
                        }
                    })
                } else {
                    return res.json({ success: false, msg: 'non sei un professore' });
                }
            }
        })
    }
}

exports.modifyDatiP = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova admin con quell'id
        Prof.findOne({
            _id: decoded._id,
        })
            .exec(function (err, prof) {
                if (err)
                    return res.json({ success: false, msg: 'il token non è valido' });
                if (!prof)
                    return res.json({ success: false, msg: 'account non trovato' });
                else {
                    if (prof) {
                        if (prof.ruolo == 'prof') {

                            Prof.findOneAndUpdate({
                                _id: req.body._id,
                            },
                                {
                                    $set: {

                                        email: req.body.email,
                                        phone: req.body.phone,
                                        address: req.body.address,
                                        city: req.body.city,
                                        state: req.body.state,

                                        gender: req.body.gender,

                                    }
                                },
                                { new: true },

                                function (err, prof) {
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
                                        return res.json({ success: false, msg: 'errore durante la riceca del professore' + err });
                                    if (!prof)
                                        return res.json({ success: false, msg: 'professore non esistente' });
                                    if (prof) {
                                        return res.json({ success: true, msg: 'professore modificato' });

                                    }
                                })
                        } else {
                            return res.json({ success: false, msg: 'non sei uno professore' });
                        }

                    }
                }

            })
    }
}
exports.editElenco = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        //trova admin con quell'id
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });

            if (!prof)
                return res.json({ succes: false, msg: 'account non trovato' });
            else {
                if (prof) {
                    if (prof.ruolo == 'prof') {

                        Elenco.findOneAndUpdate({
                            _id: req.body._id,
                        },
                            {
                                $set: {
                                    voto_provvisorio: req.body.voto_provvisorio
                                }
                            },
                            { new: true },
                            function (err, elenco) {
                                console.log(req.body.voto_provvisorio)
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la ricerca del appello' + err });
                                /*  if (!corso)
                                     return res.json({ success: false, msg: 'corso non esistente' }); */
                                if (elenco) {

                                    return res.json({ success: true, msg: 'voto modificato' });

                                }
                            })
                    } else {
                        return res.json({ success: false, msg: 'non sei un prof' });
                    }

                }
            }

        })
    }
}




exports.votiprovvisoriAppello = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, account) {
            if (err)
                return res.json({ success: false, msg: 'token non valido' });
            else {
                if (account.ruolo == 'prof') {
                    Prof.findOne({
                        account_id: decoded._id,
                    }).exec(function (err, prof) {
                        if (err)
                            return res.json({ success: false, msg: 'non è stato possibile trovare il profilo del professore' });
                        else {
                            Appello.findOne({
                                _id: req.body.id
                            }).exec(function (err, appello) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                                if (!appello)
                                    return res.json({ success: false, msg: 'appello non esistente' });
                                if (appello) {

                                    Elenco.findOneAndUpdate({
                                        appello_id: req.body.id,
                                        account_id: req.body.account_id,
                                        conferma: true,
                                        accettato: false,
                                    }, {
                                            $set: {
                                                voto_provvisorio: req.body.provvisorio,
                                                conferma: false,
                                            }
                                        }, { new: true }, function (err, doc) {
                                            if (err)
                                                return res.json({ success: true, msg: 'errore durante la ricerca degli iscritti' });
                                            if (!doc)
                                                return res.json({ success: true, msg: 'iscrizione non trovata o voto già inserito' });
                                            if (doc)
                                                return res.json({ success: true, msg: 'voto provvisorio caricato!' });
                                        })

                                }
                            })
                        }
                    })
                } else {
                    return res.json({ success: false, msg: 'non sei un professore' });
                }
            }
        })
    }
}
exports.showProfileProf = function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (!prof)
                return res.json({ success: false, msg: 'account non trovato' });
            if (prof)
                return res.json({ prof })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}

exports.searchAppello = function (req, res) {
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
            if (prof)
                Appello.findOne({
                    _id: req.body._id
                }).exec(function (err, appello) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell appello' });
                    }
                    if (!appello)
                        return res.json({ success: false, msg: 'appello non trovato' });
                    if (appello)
                        currentappello = appello;
                    return res.json({ success: false, msg: 'appello trovato' });



                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }

}
exports.viewAppello = function (req, res) {
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
            if (prof)
                Appello.findOne({
                    _id: currentappello._id
                }).exec(function (err, appello) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell appello' });
                    }
                    if (!appello)
                        return res.json({ success: false, msg: 'appello non trovato' });
                    if (appello)
                        return res.json({ success: false, msg: appello });
                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }

}
exports.searchElenco = function (req, res) {
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
            if (prof)
                Elenco.findOne({
                    _id: req.body._id
                }).exec(function (err, elenco) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell appello' });
                    }
                    if (!elenco)
                        return res.json({ success: false, msg: 'elenco non trovato' });
                    if (elenco)
                        currentelenco = elenco;

                    return res.json({ success: false, msg: 'elenco trovato' });



                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }

}

exports.viewElenco = function (req, res) {
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
            if (prof)

                Elenco.findOne({
                    _id: currentelenco._id
                }).exec(function (err, elenco) {
                    if (err) {
                        return res.json({ success: false, msg: 'errore durante la ricerca dell appello' });
                    }
                    if (!elenco)
                        return res.json({ success: false, msg: 'appello non trovato' });
                    if (elenco)
                        return res.json({ success: false, msg: elenco });
                })
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }

}
//FUNZIONANTE
exports.iscrittiAppello = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'token non valido' });
            if (prof) {
                if (prof.ruolo == 'prof') {

                    Appello.findOne({
                        _id: currentappello._id

                    }).exec(function (err, appello) {
                        if (err)
                            return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                        if (!appello)



                            return res.json({ success: false, msg: 'appello non esistente' });
                        if (appello) {
                            Elenco.find({
                                appelloid: appello._id
                            }).exec(function (err, doc) {
                                if (err)
                                    return res.json({ success: true, msg: 'errore durante la ricerca degli iscritti' });
                                if (!doc)
                                    return res.json({ success: true, msg: 'elenco non trovato' });
                                if (doc)
                                    return res.json({ success: true, msg: doc });
                            })

                        }
                    })
                }
                /* })  */
            }
            /*  }else{
                 return res.json({success:false,msg:'non sei un professore'});
             } */

        })
    }
}
