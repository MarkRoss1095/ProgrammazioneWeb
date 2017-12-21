var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Student =require('./student')

var esamisvolti = new Schema({
    nome: {type:String},
    codCorso: { type: String },
    dataApp: { type: String },
    esito:   {  type:String ,enum: ['non confermato','18','19','20','21','22','23','24','25','26','27','28','29','30','30 e lode'], default:'non confermato'},
    
    cfu: { type: Number },
    matricolastud: { type: String, ref: 'Student'},
},
    {
        versionKey: false
    });

//-----ESAMI SUPERATI E VERBALIZZATI-----
var ExamPassed = mongoose.model('ExamPassed', esamisvolti);
module.exports = ExamPassed; 