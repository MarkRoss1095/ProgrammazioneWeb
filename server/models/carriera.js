var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Esame = require('./esame');

var carriera = new Schema({
    codCorso: { type: String },
    data: { type: String },
    esito: { type: Number, min: 18, max: 31 },
    cfu: { type: Number }
},
    {
        versionKey: false
    });

//-----ESAMI SUPERATI E VERBALIZZATI-----
var MyExam = mongoose.model('MyExam', carriera);
module.exports = MyExam; 