// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./facolta');
var Carriera = require('./carriera');
var Corsi =require('./corsi');

/* var AppelliVerbalizzati = require('./appelliVerbalizzati');
 */

var studentSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address:{ type: String, required: true },
    bod: { type: Date, required: true },
    matricola: { type: String, required: true, unique: true },
    codFacolta: { type: String, ref: 'Facoltà', required: true },
    email: { type: String, required: true, unique: true, validate: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    } },
    phone: { type: Number},
    username: { type: String, required: true },
    password: { type: String, required: true },
    gender: {type: String, required: true , enum: ['F','M'] },
   // carriera: [carriera.schema], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: {type: Number, default:1},
    carriera:[Corsi.schema]
})


//-----STUDENTI-----
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;