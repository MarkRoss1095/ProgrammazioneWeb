
Prof=require('../models/professori');

const existing=11000;


exports.addProf=function(req,res,next){

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


newProf.save (function(err,prof){
    if (err) {
        if(err=existing) {
            res.json({success:false,msg:"account già esistente"})
        }
            res.json({success: false, msg: "errore"})
    } 
    
    if (prof) {
        res.json ({success:true,msg:'Ok! Professor account has been created successfully'});
    }
}) 




 }


 
}
    