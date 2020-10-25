var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    id_poste: {type:String,required:true},
    id_user: {type:String,required:true},
    categorie1: {type:String,required:true},
    description: {type:String,required:true},
    titre: {type:String,required:true},
    phone: {type:String,required:true},
    gain: {type:String,required:true},
    indication: {type:String,required:true},
    vue: {type:String},
    date: {type:Date, require:true}
});

 module.exports = mongoose.model('Offre',schema);