
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

var iscritti = new Array(Student);  //studenti che si sono iscritti ad un appello



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
        if (err)
            return res.json({ success: false, msg: 'errore durante il login,riprovare' });
        if (!prof) {
            return res.json({ success: false, msg: 'Autenticazione fallita,account non trovato' });
        } else {
            // check if password matches
            prof.comparePassword(req.body.password, function (err, isMatch) {

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
                _id:decoded._id,
            }).exec(function (err,prof){
                if (err) 
                    return res.json({success:false,msg: 'il token non è valido'});
                if(!prof)
                    return res.json({succes:false,msg:'account non trovato'});
                if(prof) {
                    if(prof.ruolo =='prof'){
                        var timestamp=req.body.data;
                        var date=moment.tz(timestamp,"Europe/Amsterdam");
                        var date=date.format().toString();
                        var x = date.substr(0, 10); // THIS IS DATA
                        var y = date.substring(11, 16); // THIS IS ORA + M

                        Appello.findOne({
                            username_prof:prof.username,
                            esame:req.body.esame,
                            data:x,
                            ora:y,
                        }).exec(function(err,verify){
                            if(err) 
                                return res.json({msg:'errore durante la verifica dell\' esistenzà dell\' appello'});
                            if(!verify){
                                var newAppello =new Appello({
                                    username_prof:prof.username,
                                    codFacolta:prof.codFacolta, 
                                    esame:req.body.esame,
                                    data:x,
                                    ora:y,
                                })
                                newAppello.save(function(err,appello){
                                    if (err)
                                        return res.json({success:false,msg:'errore durante la creazione dell\'appello'});
                                    if (appello)
                                        return res.json({succes:true,msg:'appello creato'});
                                })    
                            }if(verify)
                                return res.json({succes:false,msg:'appello già esistente'});
                        })
                    }
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }    
            })
        }else
            return res.json({succes:false,msg:"problemi col token"});
}

//funzionante
exports.deleteAppello = function (req,res){
    var token = getToken(req.headers);
    
            if (token) {
                var decoded = jwt.decode(token, process.env.SECRET);
                Prof.findOne({
                    _id:decoded._id,
                }).exec(function (err,prof){
                    if (err) 
                        return res.json({success:false,msg: 'il token non è valido'});
                    if(!prof)
                        return res.json({succes:false,msg:'account non trovato'});
                    if(prof) {
                        if(prof.ruolo =='prof'){
                            var timestamp=req.body.data;
                            var date=moment.tz(timestamp,"Europe/Amsterdam");
                            var date=date.format().toString();
                            var x = date.substr(0, 10); // THIS IS DATA
                            var y = date.substring(11, 16); // THIS IS ORA + M


                            Appello.findOne({
                                _id:req.body.id
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                   // deleteAllElenco(appello._id);
                                    remove(appello._id);
                                    return res.json({success:true,msg:'appello cancellato'});
                                }    
                            })
                        }
                        else{
                            return res.json({success:false, msg:'professore non esistente'})
                        }
                    }
                    })                
    }  else{return res.json({success: false, msg: 'token non valido'})      
}
}

//function richiamata all'interno di deleteAppello
remove = function (prof) {
    Appello.remove({
        _id : prof
    }, function(err) {
        if (err)
            res.status(400).send({success:false,msg:'errore durante la cancellazione dell\'elenco, contattare un amministratore'});
	});
}

//funzionante
exports.editAppello = function (req,res){
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
                    var timestamp = req.body.data;
                    var date = moment.tz(timestamp, "Europe/Amsterdam");
                    var date = date.format().toString();
                    var x = date.substr(0, 10); // THIS IS DATA
                    var y = date.substring(11, 16); // THIS IS ORA + M

                    Appello.findOne({
                        username_prof: prof.username,
                        esame: req.body.esame,
                        data: x,
                        ora: y,
                    }).exec(function (err, verify) {
                        if (err)
                            return res.json({ msg: 'errore durante la verifica dell\' esistenzà dell\' appello' });
                        if (!verify) {
                            var newAppello = new Appello({
                                username_prof: prof.username,
                                codFacolta: prof.codFacolta,
                                esame: req.body.esame,
                                data: x,
                                ora: y,
                            })
                            newAppello.save(function (err, appello) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la creazione dell\'appello' });
                                if (appello)
                                    return res.json({ succes: true, msg: 'appello creato' });
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
exports.editAppello = function (req, res) {
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
                    var timestamp = req.body.data;
                    var date = moment.tz(timestamp, "Europe/Amsterdam");
                    var date = date.format().toString();
                    var x = date.substr(0, 10); // THIS IS DATA
                    var y = date.substring(11, 16); // THIS IS ORA + M


                    Appello.findOneAndUpdate({
                        _id: req.body.id,
                    }, {
                            $set: {
                                data: x,
                                ora: y,
                            }
                        }, { new: true },
                        function (err, appello) {
                            if (err)
                                return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                            if (!appello)
                                return res.json({ success: false, msg: 'appello non esistente' });
                            if (appello) {
                                return res.json({ success: true, msg: 'appello modificato' });
                            }
                        })
                } else {
                    return res.json({ success: false, msg: 'non sei un professore' });
                }
            }
        })
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
                                _id: req.body.id
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

exports.modifyDatiP = function (req,res){
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
                            _id: req.body.id,
                        },
                            {
                                $set: {
                                    email: req.body.email,
                                    phone: req.body.phone,
                                    address:req.body.address,
                                    city:req.body.city,
                                    state:req.body.state,
                                }
                            },
                            { new: true },

                            function (err, prof) {
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


//da modellare ancora
exports.showIscritti = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, done) {
            if (err)
                return res.json({ success: false, msg: 'token non valido' });
            else {
                if (done.ruolo == 'prof') {
                    Prof.findOne({
                        _id: decoded._id,
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
                                    iscritti.find({
                                        appello_id: appello._id
                                    }).exec(function (err, doc) {
                                        if (err)
                                            return res.json({ success: true, msg: 'errore durante la ricerca degli iscritti' });
                                        if (!doc)
                                            return res.json({ success: true, msg: 'elenco non trovato' });
                                        if (doc) {
                                       // if() return res.json({success:true,msg:'nessun iscritto all\'appello'})
                                              return res.json({ success: true, msg: doc });
                                     } })

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

//FUNZIONANTE
exports.mostraAppelli = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

                    Prof.findOne({
                        _id: decoded._id,
                    }).exec(function (err, prof) {
                        var o=prof
                      
                        if (err)
                            return res.json({ success: false, msg: 'non è stato possibile trovare il profilo del professore' });
                        else {
                            Appello.find({
                                _id: req.body._id, //per prendere l'id dell'appello
                                username_prof: prof.username,
                            }).exec(function (err, appello) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                                if (!appello)
                                    return res.json({ success: false, msg: 'appello non esistente' });
                                if (appello) {
                    
                                    return res.json({ success: true, msg:'appelli: ' +o });
                                }
                            })
                        }
                    })
            
                } else {
                    return res.json({ success: false, msg: 'non sei un professore' });
                }
           
        }
    exports.mostraAppelli = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

                    Prof.findOne({
                        _id: decoded._id,
                    }).exec(function (err, prof) {
                        var o=prof
                      
                        if (err)
                            return res.json({ success: false, msg: 'non è stato possibile trovare il profilo del professore' });
                        else {
                            Appello.find({
                                _id: req.body._id, //per prendere l'id dell'appello
                                username_prof: prof.username,
                            }).exec(function (err, appello) {
                                if (err)
                                    return res.json({ success: false, msg: 'errore durante la riceca dell\'appello' });
                                if (!appello)
                                    return res.json({ success: false, msg: 'appello non esistente' });
                                if (appello) {
                    
                                    return res.json({ success: true, msg:'appelli: ' +o });
                                }
                            })
                        }
                    })
            
                } else {
                    return res.json({ success: false, msg: 'non sei un professore' });
                }
           
        }
    

        exports.votiprovvisoriAppello = function (req,res){
            var token = getToken(req.headers);
            if (token) {
                var decoded = jwt.decode(token, process.env.SECRET);
                Prof.findOne({   
                        _id:decoded._id,
                 }).exec(function (err,account){
                    if (err) 
                        return res.json({success:false,msg:'token non valido'});
                     else {
                        if (account.ruolo=='prof'){
                            Prof.findOne({
                                account_id:decoded._id,
                            }).exec(function (err,prof){
                                if(err)
                                    return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                                else{
                                    Appello.findOne({
                                        _id:req.body.id
                                    }).exec(function(err,appello){
                                        if(err)
                                            return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                        if(!appello)
                                           return res.json({success:false,msg:'appello non esistente'});
                                        if(appello){

                                            Elenco.findOneAndUpdate({
                                                appello_id:req.body.id,
                                                account_id:req.body.account_id,
                                                conferma:true,
                                                accettato:false,
                                            },{
                                                $set:{
                                                    voto_provvisorio:req.body.provvisorio,
                                                    conferma:false,
                                                }
                                            },{new: true},function(err,doc){
                                                if (err)
                                                   return res.json({success:true,msg:'errore durante la ricerca degli iscritti'});
                                                if(!doc)
                                                    return res.json({success:true,msg:'iscrizione non trovata o voto già inserito'});
                                                if(doc)
                                                    return res.json({success:true,msg:'voto provvisorio caricato!'});
                                            })
                                            
                                        }    
                                    })
                                }
                            }) 
                        }else{
                            return res.json({success:false,msg:'non sei un professore'});
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

//FUNZIONANTE
exports.iscrittiAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);

        Prof.findOne({   
                _id:decoded._id,
         }).exec(function (err,prof){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             if(prof) {
                if (prof.ruolo=='prof'){
                    prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                            return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            Appello.findOne({
                                _id:req.body.id
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    Elenco.find({
                                        appello_id:appello._id
                                    }).exec(function(err,doc){
                                        if (err)
                                            return res.json({success:true,msg:'errore durante la ricerca degli iscritti'});
                                        if(!doc)
                                            return res.json({success:true,msg:'elenco non trovato'});
                                        if(doc)
                                            return res.json({success:true,msg:doc});
                                    })
                                    
                                }    
                            })
                        }
                    }) 
                }
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
                               
        })    
    }        
}
