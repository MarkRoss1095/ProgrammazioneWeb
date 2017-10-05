User=require('../models/user');


// FUNCTION //
exports.addStudent = function(req,res,next) {
    if (!req.body.password || !req.body.username) {
        return  res.json({success: false, msg: 'username e password richiesti'});
    }else
    var newStudent= new User({
        username: req.body.username, 
        password: req.body.password,
        email:req.body.email,
        nome:req.body.nome,
        cognome:req.body.cognome,
        
        stato:req.body.stato,
        città:req.body.città,
        indirizzo:req.body.indirizzo,
        dataDiNascita:req.body.dataDiNascita,
        matricola:req.body.matricola,
        codFacoltà:req.body.codFacoltà,
        telefono:req.body.telefono,
    });
    newStudent.save(function(err,student){
        if (err) {
            res.json ({success:false,msg:'errore'});
        } if (student) {
            res.json ({success:true,msg:'ok'});
        }
    })
};
    