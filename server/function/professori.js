
//import models
Prof=require('../models/professore');
Appello=require('../models/appello');
var bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');
// variabili
var key='test'
var jwt= require('jwt-simple');
var moment =require('moment-timezone');

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

exports.addProf= function(req,res,next){

    if (!req.body.nameP || !req.body.surname) {
        return  res.json({state: false, message: 'name and surname are required'});
    }

    if (!req.body.password || !req.body.username) {
        return  res.json({state: false, message: 'username and password are required'});
    }
    
    if (!req.body.email) {
        return  res.json({state: false, message: 'email is required'});
    }
    if (!req.body.gender) {
        return  res.json({state: false, message: 'gender is required'});
    }
  
    if (!req.body.phone) {
        return  res.json({state: false, message: 'phone is required'});
    }

    if (!req.body.state || !req.body.city) {
        return  res.json({state: false, message: 'state and city are required'});
    }
  
    if (!req.body.bod) {
        return  res.json({state: false, message: 'date of birthday is requireddd'});
    }
    

    if (!req.body.city) {
        return  res.json({state: false, message: 'city is required'});
    }
  
    if (!req.body.address) {
        return  res.json({state: false, message: 'address is required'});
    }


    if (!req.body.codFacolta) {
        return  res.json({state: false, message: 'codicefacolta is required'});
    }

    else{ 

        var newProf=new Prof({
           // _id:req.body.id,
            nameP:req.body.nameP,
            surname:req.body.surname,
            email:req.body.email,
            codFacolta:req.body.codFacolta,
            username:req.body.username,
            password:createHash(req.body.password),
            state:req.body.state,
            city:req.body.city,
            address:req.body.address,
            phone:req.body.phone,
            bod:req.body.bod,
            gender:req.body.gender
        })
        newProf.save(function(err,prof){
            if (err) {
                    res.json({success: false, msg:err})
            } 

            else {
                res.json ({success:true,msg:'Ok! Professor account has been created successfully'});
            }
        }) 
        }
        }


        exports.loginProf = function(req,res) {
            Prof.findOne({
                username: req.body.username
            }, function(err, prof) {
                if (err) 
                    return res.json({success: false, msg: 'errore durante il login,riprovare'}); 
                if (!prof) {
                    return res.json({success: false, msg: 'Autenticazione fallita,account non trovato'});
                }else{
                // check if password matches
                    prof.comparePassword(req.body.password,function(err, isMatch) {
                       
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.encode(prof,process.env.SECRET);
                        
                            // return the information including token as JSON
                        
                            return res.json({success: true, token:'JWT ' + token});
                        }else{
                            
                            return  res.json({success: false, msg: 'Autenticazione fallita, password errata.'});
                        }
                    });
                }
            });  
        };



exports.addAppello = function(req,res) {
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
                                    deleteAllElenco(appello._id);
                                    deleteAppello(appello._id);
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

exports.editAppello = function (req,res){
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


                            Appello.findOneAndUpdate({
                                _id:req.body.id,
                            },{
                                $set:{
                                    data:x,
                                    ora:y,
                                }
                            },{new: true},function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    return res.json({success:true,msg:'appello modificato'});
                                }    
                            })
                        }
                    
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        )    
    }        
}


exports.chiudiAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                            return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            Appello.findOneAndUpdate({
                                _id:req.body.id
                            },{
                                $set:{
                                    aperto:false,
                                }
                            },{new: true},function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    return res.json({success:true,msg:'appello chiuso'});
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


exports.iscrittiAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
              //  if (account.role=='prof'){
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
               /* }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }*/
            }                    
        })    
    }        
}


exports.mostraAppelli = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
              //  if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                           return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{                            
                            Appello.find({
                                esame:prof.insegnamenti,
                                corso:prof.corso,
                                prof_id:prof.account_id,
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    return res.json({success:true,msg:appello});
                                }    
                            })
                        }
                    })
           /* }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }*/
            }                    
        })    
    }        
}
