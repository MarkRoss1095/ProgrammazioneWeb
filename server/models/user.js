// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./facolta');
var carriera = require('./carriera');

var studentSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    indirizzo:{ type: String, required: true },
    dataDiNascita: { type: Date, required: true },
    matricola: { type: String, required: true, unique: true },
    codFacoltà: { type: String, ref: 'Facoltà', required: true },
    email: { type: String, required: true, unique: true },
    telefono: Number,
    username: { type: String, required: true },
    password: { type: String, required: true },
    carriera: [carriera.schema], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: {type: Number, default:1}
})


//-----STUDENTI-----
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;