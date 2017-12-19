var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Esame = require('./esame');
var Student =require('./student')

var esamisvolti = new Schema({
    nome: {type:String},
    codCorso: { type: String },
    data: { type: String },
    esito: { type: Number, min: 18, max: 31 },
    cfu: { type: Number },
    matricolastud: { type: String, ref: 'Student'},
},
    {
        versionKey: false
    });

//-----ESAMI SUPERATI E VERBALIZZATI-----
var ExamPassed = mongoose.model('ExamPassed', esamisvolti);
module.exports = ExamPassed; 