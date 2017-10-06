User=require('../models/user');

const existing=11000;

// FUNCTION //
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
  
    if (!req.body.date) {
        return  res.json({state: false, message: 'date is required'});
    }
    
  
    if (!req.body.address) {
        return  res.json({state: false, message: 'address is required'});
    }

    if (!req.body.codFacoltà) {
        return  res.json({state: false, message: 'codicefacoltà is required'});
    }

    if (!req.body.matricola) {
        return  res.json({state: false, message: 'matricola is required'});
    }else{ 


    //if the are not error you can create a new student 

    var newStudent= new User({
        username: req.body.username, 
        password: req.body.password,
        email:req.body.email,
        name:req.body.name,
        surname:req.body.surname,
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        date:req.body.date,
        gender:req.body.gender,
        matricola:req.body.matricola,
        codFacoltà:req.body.codFacoltà,
        number:req.body.number,
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


