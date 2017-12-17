var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Appello =require('./appello');
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
       type:String ,enum : ['null','non suff', '18','19','20','21','22','23','24','25','26','27','28','29','30','30 e lode'],default:'null',
   },
   conferma:{
       type:Boolean,default:false
   },
   accettato:{
       type:Boolean,default:false,
   },
   voto_definitivo:{
    type:String ,enum: ['null','18','19','20','21','22','23','24','25','26','27','28','29','30','30 e lode'], default:'null',
},
   data:{
       type:String
   },
   ora:{
       type:String
   },
   
    });

module.exports = mongoose.model('Elenco', ElencoSchema);