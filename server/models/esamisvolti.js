var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Esame = require('./esame');

var esamisvolti = new Schema({
    
    codCorso: { type: String },
    data: { type: String },
    esito: { type: Number, min: 18, max: 31 },
    cfu: { type: Number }
},
    {
        versionKey: false
    });

//-----ESAMI SUPERATI E VERBALIZZATI-----
var ExamPassed = mongoose.model('ExamPassed', esamisvolti);
module.exports = ExamPassed; 