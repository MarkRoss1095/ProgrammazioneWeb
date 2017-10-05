User=require('../models/user');

const existing=11000;

// FUNCTION //
exports.addStudent = function(req,res,next) {
    if (!req.body.name || !req.body.surname) {
        return  res.json({success: false, msg: 'name and surname are required'});
    }

    if (!req.body.password || !req.body.username) {
        return  res.json({success: false, msg: 'username and password are required'});
    }
    
    if (!req.body.email) {
        return  res.json({success: false, msg: 'email is required'});
    }
  
    if (!req.body.state || !req.body.city) {
        return  res.json({success: false, msg: 'state and city are required'});
    }
  
    if (!req.body.date) {
        return  res.json({success: false, msg: 'date is required'});
    }
    
  
    if (!req.body.address) {
        return  res.json({success: false, msg: 'address is required'});
    }

    if(err==existing){
        return res.json({success:false, msg:'This Account is already created!'});
    
    }


    else


    var newStudent= new User({
        username: req.body.username, 
        password: req.body.password,
        email:req.body.email,
        name:req.body.nome,
        surname:req.body.cognome,
        state:req.body.stato,
        city:req.body.città,
        address:req.body.indirizzo,
        date:req.body.dataDiNascita,
       // matricola:req.body.matricola,
       // codFacoltà:req.body.codFacoltà,
        number:req.body.telefono,
    });


    newStudent.save(function(err,student){
        if (err) {
            res.json ({success:false,msg:'error in creating student account'});
        } if (student) {
            res.json ({success:true,msg:'ok! Student account has been created successfully'});
        }
    })
};
    