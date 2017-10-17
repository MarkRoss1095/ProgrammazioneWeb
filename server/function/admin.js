Admin = require('../models/admin');
Prof  = require('../models/professore');
Student = require ('../models/student');

var bcrypt = require('bcrypt');
var jwt= require('jwt-simple');
var bCrypt = require('bcrypt-nodejs');


exports.addAdmin = function(req, res, next){
    if (!req.body.name || !req.body.surname) {
        return  res.json({state: false, message: 'name and surname are required'});
    }

    if (!req.body.password || !req.body.username) {
        return  res.json({state: false, message: 'username and password are required'});
    }
    
    if (!req.body.email) {
        return  res.json({state: false, message: 'email is required'});
    }
    if (!req.body.state || !req.body.city) {
        return  res.json({state: false, message: 'state and city are required'});
    }

    if (!req.body.phone) {
        return  res.json({state: false, message: 'phone is required'});
    }

    if (!req.body.address) {
        return  res.json({state: false, message: 'address is required'});
    }
    else {
        var newAdmin = new Admin ({
            name:req.body.name,
            surname:req.body.surname,
            email:req.body.email,
            username:req.body.username,
            password:createHash(req.body.password),
            state:req.body.state,
            city:req.body.city,
            address:req.body.address,
            phone:req.body.phone,
        })
    newAdmin.save (function(err,admin){
        if(err) {
            if (err = existing) {
                res.json({success:false, msg:'account già esistente'})
            }
            res.json({success:false, msg:'errore'})
        }
        if (admin){
            res.json({success:true, msg:'Admin account created successfully'})
        } 
    })
}
}


exports.addFacolta = function(req,res){
    
        var newFacolta= new Facolta({
            nome:req.body.nome,
            codFacolta:req.body.codFacolta,
        });
    
        newFacolta.save (function(err,student){
            if (err) {
                res.json({success: false, msg: "errore"})
            } 
            
            if (student) {
                res.json ({success:true,msg:'ciccia'});
            }
        }) 
}
    
exports.deleteProf = function (req,res){
    var token = getToken(req.headers);
            if (token) {
                var decoded = jwt.decode(token, process.env.SECRET);
                //ricerca un admin con quell'id
                Admin.findOne({
                    _id:decoded._id,
                }).exec(function (err,admin){
                    if (err) 
                        return res.json({success:false,msg: 'il token non è valido'});
                    if(!admin)
                        return res.json({succes:false,msg:'admin non trovato'});
                    if(admin) {
                        if(admin.ruolo =='admin'){

                            Prof.findOne({

                                _id:req.body.id,
                                username: req.body.username

                            }).exec(function(err,prof){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la ricerca dello studente'});
                                if(!prof)
                                    return res.json({success:false,msg:'professore non esistente'});
                                if(prof){
                                   // deleteAllElenco(appello._id);
                                    removeprof(prof._id);
                                    return res.json({success:true,msg:'professore cancellato dal sistema!'});
                                }    
                            })
                        }

                        else {
                            return res.json({success:false, msg:'admin non esistente'})
                        }
                    }
                    })                
    }  else{return res.json({success: false, msg: 'token non valido'})      
}
}


//funzionante
exports.deleteStudent = function (req,res){
    var token = getToken(req.headers);
            if (token) {
                var decoded = jwt.decode(token, process.env.SECRET);
                //ricerca un admin con quell'id
                Admin.findOne({
                    _id:decoded._id,
                }).exec(function (err,admin){
                    if (err) 
                        return res.json({success:false,msg: 'il token non è valido'});
                    if(!admin)
                        return res.json({succes:false,msg:'admin non trovato'});
                    if(admin) {
                        if(admin.ruolo =='admin'){

                            Student.findOne({

                                _id:req.body.id,
                                username: req.body.username

                            }).exec(function(err,student){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la ricerca dello studente'});
                                if(!student)
                                    return res.json({success:false,msg:'studente non esistente'});
                                if(student){
                                   // deleteAllElenco(appello._id);
                                    remove(student._id);
                                    return res.json({success:true,msg:'studente cancellato dal sistema!'});
                                }    
                            })
                        }

                        else {
                            return res.json({success:false, msg:'admin non esistente'})
                        }
                    }
                    })                
    }  else{return res.json({success: false, msg: 'token non valido'})      
}
}

remove = function (student) {
    Student.remove({
        _id : student
    }, function(err) {
        if (err)
            res.status(400).send({success:false,msg:'errore durante la cancellazione dello studente, contattare un amministratore'});
	});
}

removeprof = function (prof) {
    Prof.remove({
        _id : prof
    }, function(err) {
        if (err)
            res.status(400).send({success:false,msg:'errore durante la cancellazione del professore, contattare un amministratore'});
	});
}
//funzionante
exports.loginAdmin = function(req,res) {
       Admin.findOne({
        username: req.body.username
    }, function(err, admin) {
        if (err) 
            return res.json({success: false, msg: 'errore durante il login,riprovare'}); 
        if (!admin) {
            return res.json({success: false, msg: 'Autenticazione fallita,account non trovato'});
        }else{

            
        // check if password matches
            admin.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(admin, process.env.SECRET);
                    // return the information including token as JSON
                    return res.json({success: true, token:'JWT ' + token});
                }else{
                    return  res.json({success: false, msg: 'Autenticazione fallita, password errata.'});
                }
            });
        }
    }); 
}
/// TEST DATABASE ///
exports.addFacolta = function(req,res){
    
        var newFacolta= new Facolta({
            nome:req.body.nome,
            codFacolta:req.body.codFacolta,
            
        });
        
        newFacolta.save (function(err,facolta){
            if (err) {
                res.json({success: false, msg: "errore"})
            } 
            
            if (facolta) {
                res.json ({success:true,msg:'facolta inserita'});
            }
        }) 
}
    
exports.addCorso = function(req,res) {
        
            var newCorso= new Corso({
                nome:req.body.nome,
                codice:req.body.codice,
                codFacolta:req.body.codFacolta,
                cfu:req.body.cfu,
                anno:req.body.anno,
                
            });
            newCorso.save (function(err,student){
                if (err) {
                    res.json({success: false, msg: err})
                } 
                
                if (student) {
                    res.json ({success:true,msg:'corso creato'});
                }
            }) 
 }


///######################################################## ALTRE FUNZIONI UTILIZZATE

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



//fare funzione aggiungi corso ad un professore
