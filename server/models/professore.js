var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Corsi = require('./corsi');

var bcrypt = require('bcrypt-nodejs');
//var bCrypt = require('bcrypt');


var professoreSchema = new Schema({
  
    nameP: { type: String, required: true},
    surname: { type: String, required: true },
    codFacolta: { type: String, ref: 'Facoltà',required:true},
    gender:{type:String, required:true, enum:['M','F']},
    email: { type: String, required: true, unique: true, validate: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    } },
    ruolo: {
        type: String,
        enum: ['student','admin','prof'],
        default: 'prof' },
    username: {type: String, required: true,unique:true},
    password: {type:String, required: true },
    state: {type: String, required: true },
    address: {type: String, required:true},
    city: { type: String, required: true },
    phone: {type: Number, required: true },
    bod: {type: Date, required: true },
    corsi:[Corsi],
},
    {
        versionKey: false
    });
    professoreSchema.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    
//-----Professore-----
var Professore = mongoose.model('Professore', professoreSchema);
module.exports = Professore

