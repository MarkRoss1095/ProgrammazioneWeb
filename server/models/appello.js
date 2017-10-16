var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppelloSchema = new Schema({
    
    username_prof:{
        type:String,required:true
    },
    codFacolta:{
        type:String,required:true
    },
    esame:{
        type:String,required:true
    },
    data:{
        type:String,required:true
    },
    ora:{
        type:String,required:true
    },

    number_iscritti:{
        type:Number,default:0
    },

    elenco_studenti:
        [{ type: String, ref: 'Studenti' }]
,
    aperto:{
        type:Boolean,default:true,required:true,
    },
        versionKey: false
    });

module.exports = mongoose.model('Appello', AppelloSchema);