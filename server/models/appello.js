var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppelloSchema = new Schema({
    
    idProf:{
        type:String
    },
    nameProf:{
        type:String
    },
    corso:{
        type:String,required:true
    },
    exam:{
        type:String,required:true
    },
    date:{
        type:String,required:true
    },
   
    number_iscritti:{
        type:Number,default:0
    },
    open: {
        type:Boolean,default:true
    },
     
    });

module.exports = mongoose.model('Appello', AppelloSchema);