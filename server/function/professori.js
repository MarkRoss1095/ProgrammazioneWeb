
//import models
Prof=require('../models/professore');
Appello=require('../models/appello');

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

    if (!req.body.name || !req.body.surname) {
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
  
    if (!req.body.date) {
        return  res.json({state: false, message: 'date is required'});
    }
    
  
    if (!req.body.address) {
        return  res.json({state: false, message: 'address is required'});
    }

    if (!req.body.codFacoltà) {
        return  res.json({state: false, message: 'codicefacoltà is required'});
    }

    else{ 

        var newProf=new Prof({
            id:req.body.id,
            name:req.body.name,
            surname:req.body.surname,
            email:req.body.email,
            codFacoltà:req.body.codFacoltà,
            username:req.body.username,
            password:req.body.password,
            state:req.body.state,
            city:req.body.city,
            address:req.body.address,
            phone:req.body.phone,
            date:req.body.date,
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

    console.log(token)


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
                  // if (account.role=='prof'){
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