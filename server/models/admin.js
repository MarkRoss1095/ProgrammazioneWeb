var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('./corsi')
var bcrypt = require('bcrypt');


var adminSchema = new Schema({

    name: { type: String, required: true},
    surname: { type: String, required: true },
    gender:{type:String, required:true, enum:['M','F']},
    email: { type: String, required: true, unique: true, validate: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    } },
    username: {type: String, required: true,unique:true},
    password: {type:String, required: true },
    state: {type: String, required: true },
    address: {type: String, required:true},
    city: { type: String, required: true },
    phone: {type: Number, required: true },
    bod: {type: Date, required: true },
},
    //toglie il campo __v dal db
    {
        versionKey: false
    });
  
    
    adminSchema.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
//-----AMMINISTRATORI-----
var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

