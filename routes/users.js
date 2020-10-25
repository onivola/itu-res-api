var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken'); //token
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/',verifyToken, function(req,res) { //READ ALL USER
  User.find((err,docs)=> {
      if(!err) { res.send(docs); }
      else { return res.status(201).json({message: 'Error registering post.'}) }

  });
});
//REGISTRE
router.post('/register', function(req,res,next) {
  var user = new User({
    prenom: req.body.prenom,
    nom: req.body.nom,
    email: req.body.email,
    mdp: User.hashPassword(req.body.mdp),
    phone: req.body.phone,
    iam: req.body.iam,
    adresse: req.body.adresse,
    profil: req.body.profil,
   
    presentation: '',
    //Bricolage
    meubles: false,
    menuisier: false,
    beton: false,
    papier: false,
    joints: false,
    electronique: false,
    //mecanique
    monter: false,
    vidange: false,
    moteur: false,
    pneus: false,
    carrosserie: false,
    date: Date.now()

  });


  let promise = User.findOne({email:req.body.email}).exec();
  
      promise.then(function(doc) {
        if(doc) { //email in database
            let token = jwt.sign({user:doc},'secret', {expiresIn:'3h'});
            return res.status(501).json({message:'inscrit'})
        } else {
          let promise = user.save();
          promise.then(function(doc) {
              return res.status(201).json(doc);
          });
        
          promise.catch(function(err){
            return res.status(201).json({message: 'Error registering user.'})
          });
        }
      });
      promise.catch(function(res){
        return res.status(501).json({message:'Some internal error'});
      });
});

//REGISTRE XML
router.post('/xmlregister', function(req,res,next) {
  var user = new User({
    prenom: req.body.prenom,
    nom: req.body.nom,
    email: req.body.email,
    mdp: User.hashPassword(req.body.mdp),
    phone: req.body.phone,
    iam: req.body.iam,
    adresse: req.body.adresse,
    profil: req.body.profil,
   
    presentation: req.body.presentation,
    //Bricolage
    meubles: req.body.meubles,
    menuisier: req.body.menuisier,
    beton: req.body.beton,
    papier: req.body.papier,
    joints: req.body.joints,
    electronique: req.body.electronique,
    //mecanique
    monter: req.body.monter,
    vidange: req.body.vidange,
    moteur: req.body.moteur,
    pneus: req.body.pneus,
    carrosserie: req.body.carrosserie,
    date: Date.now()

  });

  let promise = User.findOne({email:req.body.email}).exec();
  
      promise.then(function(doc) {
        if(doc) { //email in database
            let token = jwt.sign({user:doc},'secret', {expiresIn:'3h'});
            return res.status(501).json({message:'inscrit'})
        } else {
          let promise = user.save();
          promise.then(function(doc) {
              return res.status(201).json(doc);
          });
        
          promise.catch(function(err){
            return res.status(201).json({message: 'Error registering user.'})
          });
        }
      });
      promise.catch(function(res){
        return res.status(501).json({message:'Some internal error'});
      });
});
//LOGIN
router.post('/login', function(req,res,next){
  let promise = User.findOne({email:req.body.email}).exec();

  promise.then(function(doc) {
    if(doc) { //email in database
      if(doc.isValid(req.body.mdp)) { //password valid
        //generate token
        let token = jwt.sign({user:doc},'secret', {expiresIn:'3h'});
        return res.status(200).json(token);
      } else {
          return res.status(501).json({message:'Invalid password'})
      }
    } else { //not in ddb
      return res.status(501).json({message:'User is not registered.'})
    }
  });
  promise.catch(function(res){
    return res.status(501).json({message:'Some internal error'});
  });
});

router.get('/getById/:id',verifyToken,function(req, res){ //READ BY ID
  if(!ObjectId.isValid(req.params.id)) //if id is-valid
      return res.status(400).send(`No record with given id : + ${req.params.id}`);
  
      User.findById(req.params.id, (err, doc) => {
      if(!err) { return res.send(doc); }
      else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
  });
});

//verify token
var decodedToken='';
router.get('/username',verifyToken,function(req,res,next){
  return res.status(200).json(decodedToken.user);
 
})

router.put('/:id',verifyToken, function(req, res) { //UPDATE BY ID
  if(!ObjectId.isValid(req.params.id)) //if id is-valid
      return res.status(400).send(`No record with given id : + ${req.params.id}`);

  var UserEdit = {
      prenom: req.body.prenom,
      nom: req.body.nom,
      email: req.body.email,
      mdp: User.hashPassword(req.body.mdp),
      phone: req.body.phone,
      iam: req.body.iam,
      adresse: req.body.adresse,
      profil: req.body.profil,
     
      presentation: req.body.presentation,
      //Bricolage
      meubles: req.body.meubles,
      menuisier: req.body.menuisier,
      beton: req.body.beton,
      papier: req.body.papier,
      joints: req.body.joints,
      electronique: req.body.electronique,
      //mecanique
      monter: req.body.monter,
      vidange: req.body.vidange,
      moteur: req.body.moteur,
      pneus: req.body.pneus,
      carrosserie: req.body.carrosserie
  };

  User.findByIdAndUpdate(req.params.id, { $set: UserEdit }, { new: true }, (err,doc) => {
      if(!err) { return res.send(doc); }
      else { console.log('Error in User Update: ' + JSON.stringify(err,undefined,2)); }
  });
});

function verifyToken(req,res,next) {
  let token = req.query.token;
  jwt.verify(token,'secret',function(err,tokendata) {
    if(err) {
      return res.status(400).json({message:'Unauthorized request'});

    }
    if(tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}


module.exports = router;
