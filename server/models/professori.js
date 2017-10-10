var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Course = require('./corsi')

var peopleSchema = new Schema({

    id:{type: Number,index:true,unique: true},
    name: { type: String, required: true},
    surname: { type: String, required: true },
    codFacoltà: {type: String, //ref: 'Facoltà',
     required: true },
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
    date: {type: String, required: true },
    corsi: [{ type: String, ref: 'Corsi' }]
},

    //toglie il campo __v dal db
    {
        versionKey: false
    });
    
   peopleSchema.pre('save', function (next) {
        var Prof = this;
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(Prof.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    Prof.password = hash;
                    next();
                });
            });
        } else {
            return next();
        }
    });
     
    peopleSchema.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    
    
    module.exports = mongoose.model('Prof', peopleSchema);