var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    id_user: {type:String,required:true},
    adresse: {type:String},
    budjet: {type:String,required:true},
    categorie1: {type:String,required:true},
    categorie2: {type:String,required:true},
    description: {type:String,required:true},
    personne: {type:String,required:true},
    titre: {type:String,required:true},
    phone: {type:String,required:true},
    datejob: {type:String,required:true},
    date: {type:Date, require:true}
});

 module.exports = mongoose.model('Poster',schema);