//// get an instance of mongoose and mongoose.Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminSchema = new Schema ({
    name: { type: String, required: true},
    surname: {type: String, required: true},
    city: { type: String, required: true },
    address:{ type: String, required: true },
    email: { type: String, required: true, unique: true, validate: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    } },
    username: { type: String, required: true },
    password: { type: String, required: true },
})

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;