User=require('../models/student');
Facolta=require('../models/facolta');
Corso=require('../models/corsi');
var bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');
var jwt= require('jwt-simple');

const existing=11000;

// FUNCTION //

/**Funzione per criptare la password nel db */
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


exports.addStudent = function(req,res,next) {
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
  
    if (!req.body.state || !req.body.city) {
        return  res.json({state: false, message: 'state and city are required'});
    }
  
    if (!req.body.bod) {
        return  res.json({state: false, message: 'date is required'});
    }
    
  
    if (!req.body.address) {
        return  res.json({state: false, message: 'address is required'});
    }

    if (!req.body.codFacolta) {
        return  res.json({state: false, message: 'codicefacoltà is required'});
    }

    if (!req.body.matricola) {
        return  res.json({state: false, message: 'matricola is required'});
    }else{ 
        
    //if the are not error you can create a new student 

    var newStudent= new User({
        username: req.body.username, 
        password: createHash(req.body.password),
        email:req.body.email,
        name:req.body.name,
        surname:req.body.surname,
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        bod:req.body.bod,
        gender:req.body.gender,
        matricola:req.body.matricola,
        codFacolta:req.body.codFacolta,
        phone:req.body.phone,
    });


    newStudent.save (function(err,student){
        if (err) {
            if(err=existing) {
                res.json({success:false,msg:"account già esistente"})
            }
                res.json({success: false, msg: "errore"})
        } 
        
        if (student) {
            res.json ({success:true,msg:'Ok! Student account has been created successfully'});
        }
    }) 
}

};

exports.loginStudent = function(req,res) {

    User.findOne({
        username:req.body.username
    },
     function(err, student) {
        if (err) 
            return res.json({success: false, msg: 'errore durante il login,riprovare'}); 
        if (!student) {
            return res.json({success: false, msg: 'Autenticazione fallita,account non trovato'});
        
        }else{
            
        // check if password matches
            student.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(student, process.env.SECRET);
                    // return the information including token as JSON
                 
                    return res.json({success: true, token:'JWT ' + token});
                }else{
                    return  res.json({success: false, msg: 'Autenticazione fallita, password errata.'});
                }
            });
        }
    });
};


/// TEST DATABASE ///
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

exports.addCorso = function(req,res){
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
                res.json ({success:true,msg:'ciccia'});
            }
        }) 
    }

