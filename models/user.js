var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    email: {type:String,required:true},
    prenom: {type:String,required:true},
    nom: {type:String,required:true},
    email: {type:String,required:true},
    mdp: {type:String,required:true},
    phone: {type:String,required:true},
    iam: {type:String,required:true},
    adresse: {type:String,required:true},
    profil: {type:String},
    

    presentation: {type:String},
    //Bricolage
    meubles: {type:String},
    menuisier: {type:String},
    beton: {type:String},
    papier: {type:String},
    joints: {type:String},
    electronique: {type:String},
    //mecanique
    monter: {type:String},
    vidange: {type:String},
    moteur: {type:String},
    pneus: {type:String},
    carrosserie: {type:String},
    date: {type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(mdp) {
    return bcrypt.hashSync(mdp,10);
}

schema.methods.isValid = function(hashedpassword) { //check password in database
    return bcrypt.compareSync(hashedpassword,this.mdp);
}
 module.exports = mongoose.model('User',schema);