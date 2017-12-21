var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Studenti = require('./student')
var Elenco = require('./elencostudenti')


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
    dataApp:{
        type:String,required:true
    },
    ora:{
        type:String,required:true
    },

     iscritti:{
        type:Number,default:0
    }, 
   
        //elenco degli studenti iscritti a questo appello
    aperto:{
        type:Boolean,default:true,required:true,
    },
},
{
    versionKey: false
});
var Appello = mongoose.model('Appello', AppelloSchema);
module.exports = Appello