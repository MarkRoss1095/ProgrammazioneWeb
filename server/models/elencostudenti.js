var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Prof=require('./professore')
var Appello =require('./appello');
var Student= require('./student')
var ElencoSchema = new Schema({


   appelloid:{
       type:String,required:true,  //id dell'appello
   },
   accountid:{
       type:String,required:true   // matricola studente
   },
   esame:{
       type:String
   },
   nome:{
       type:String,
   },
   cognome:{
       type:String,
   },
   voto_provvisorio:{
       type:String ,enum : ['non ancora caricato','non suff', '18','19','20','21','22','23','24','25','26','27','28','29','30','30 e lode'],default:'non ancora caricato',
   },
   conferma:{
       type:Boolean,default:false
   },
   accettato:{
       type:Boolean,default:false,
   },
   voto_definitivo:{
    type:String ,enum: ['non confermato','18','19','20','21','22','23','24','25','26','27','28','29','30','30 e lode'], default:'non confermato',
},
   dataApp:{
       type:String
   },
   ora:{
       type:String
   },
   
    });
    var Elenco = mongoose.model('Elenco', ElencoSchema);
    module.exports = Elenco;
