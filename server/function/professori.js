
//import models
Prof=require('../models/professore');
Appello=require('../models/appello');
var bcrypt = require('bcrypt');

// variabili
var key='test'
var jwt= require('jwt-simple');


// ALTRE FUNZIONI

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
            id:req.body.id,
            nameP:req.body.nameP,
            surname:req.body.surname,
            email:req.body.email,
            codFacolta:req.body.codFacolta,
            username:req.body.username,
            password:req.body.password,
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

        var jwt= require('jwt-simple');

        exports.loginProf = function(req,res) {
            Prof.findOne({
                username: req.body.username
            }, function(err, user) {
                if (err) 
                    return res.json({success: false, msg: 'errore durante il login,riprovare'}); 
                if (!user) {
                    return res.json({success: false, msg: 'Autenticazione fallita,account non trovato'});
                }else{
                // check if password matches
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.encode(user,process.env.SECRET );
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
            }).exec(function (err,account){
                if (err) 
                    return res.json({success:false,msg: err});
                if(!account)
                    return res.json({succes:false,msg:'account non trovato'});
                if(account) {
                        Prof.findOne({
                            id:decoded._id,
                        }).exec(function (err,prof){
                            if(err)
                                return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                            if(prof){
                                var timestamp=req.body.data;
                                var date=moment.tz(timestamp,"Europe/Amsterdam");
                                var date=date.format().toString();
                                var x = date.substr(0, 10);
                                var y = date.substring(11, 16);

                                Appello.findOne({
                                    esame:prof.insegnamenti,
                                    data:x,
                                    ora:y,
                                }).exec(function(err,verify){
                                    if(err) 
                                        return res.json({err});
                                    if(!verify){
                                            var newAppello =new Appello({
                                        
                                               prof_id:prof.id,
                                                name_prof:prof.name +' ' + prof.surname,
                                                corso:prof.corso, 
                                                esame:prof.insegnamenti,
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
                        })
                   // }else{
                        return res.json({success:false,msg:'non sei un professore'});
                  //  }   
            }
        })
    }else{
        //to change token with message
        return res.json({succes:false,msg:"problemi col token"});
    }
}

exports.deleteAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
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
                                    deleteAllElenco(appello._id);
                                    deleteAppello(appello._id);
                                    return res.json({success:true,msg:'appello cancellato'});
                                }    
                            })
                        }
                    }) 
            }                    
        })    
    }        
}

exports.editAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                           return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            var timestamp=req.body.data;
                            var date=moment.tz(timestamp,"Europe/Amsterdam");
                            var date=date.format().toString();
                            var x = date.substr(0, 10);
                            var y = date.substring(11, 16);
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
                    }) 
               /* }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }*/
            }                    
        })    
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
/*exports.addAppello = function(req,res) {
    var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, process.env.SECRET);
            Account.findOne({
                _id:decoded._id,
            }).exec(function (err,account){
                if (err) 
                    return res.json({success:false,msg:'token non valido'});
                if(!account)
                    return res.json({succes:false,msg:'account non trovato'});
                if(account) {
                    if (account.role=='prof'){
                        Prof.findOne({
                            account_id:decoded._id,
                        }).exec(function (err,prof){
                            if(err)
                                return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                            if(prof){
                                var timestamp=req.body.data;
                                var date=moment.tz(timestamp,"Europe/Amsterdam");
                                var date=date.format().toString();
                                var x = date.substr(0, 10);
                                var y = date.substring(11, 16);

                                Appello.findOne({
                                    esame:prof.insegnamenti,
                                    data:x,
                                    ora:y,
                                }).exec(function(err,verify){
                                    if(err) 
                                        return res.json({err});
                                    if(!verify){
                                            var newAppello =new Appello({
                                                prof_id:prof.account_id,
                                                name_prof:prof.firstname +' ' + prof.lastname,
                                                corso:prof.corso, 
                                                esame:prof.insegnamenti,
                                                data:x,
                                                ora:y,
                                            })
                                            newAppello.save(function(err,appello){
                                                if (err)
                                                    return res.json({success:false,msg:'errore druante la creazione dell\'appello'});
                                                if (appello)
                                                   return res.json({succes:true,msg:'appello creato'});
                                            })    
                                    }if(verify)
                                            return res.json({succes:false,msg:'appello già esistente'});
                                    })
                            }
                        })
                    }else{
                        return res.json({success:false,msg:'non sei un professore'});
                    }   
            }
        })
    }else{
        return res.json({succes:false,msg:'token non valido'});
    }
}*/


exports.loginProf = function(req,res) {
        Prof.findOne({
            username:req.body.username
        },
         function(err, prof) {
            if (err) 
                return res.json({success: false, msg: 'errore durante il login,riprovare'}); 
            if (!prof) {
                return res.json({success: false, msg: 'Autenticazione fallita,account non trovato'});
        
            }else{
                
            // check if password matches
                prof.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(prof, process.env.SECRET);
                        // return the information including token as JSON
                     
                        return res.json({success: true, token:'JWT ' + token});
                    }else{
                        return  res.json({success: false, msg: 'Autenticazione fallita, password errata.'});
                    }
                });
            }
        });
    };
    