var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Prof = require('./professore')
var Facolta =require('./facolta');

var corsiSchema = new Schema({
    nome: { type: String, required: true  },
    codice: { type: String, required: true, unique: true },
    codFacolta: {type: String, required: true, ref:'Facolta'},
    cfu: { type: Number, required: true },
    anno:  { type: String, required: true/* , enum:[1,2,3] */ },
    usernameProf: { type: String, ref: 'Prof'},
},
    {
        versionKey: false
    });

//-----CORSI-----
var Corsi = mongoose.model('Corsi', corsiSchema);
module.exports = Corsi;