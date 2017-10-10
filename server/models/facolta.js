var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Corsi = require('./corsi');

var facoltaSchema = new Schema({
    nome: { type: String, required: true,unique:true },
    codFacolta: { type: String, required: true, unique: true },
    corsi: [{ type: String, ref: 'Corsi' }]
},
    {
        versionKey: false
    });

//-----FACOLTA'-----
var Facolta = mongoose.model('Facolta', facoltaSchema);
module.exports = Facolta