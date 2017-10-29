var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('./corsi')
var bcrypt = require('bcrypt-nodejs');


var adminSchema = new Schema({
    username: {type: String, required: true,unique:true},
    password: {type:String, required: true },
   
    ruolo: {
        type: String,
        enum: ['student','admin','prof','user'],
        default: 'admin' },
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

