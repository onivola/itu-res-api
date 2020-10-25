var express = require('express');
var router = express.Router();
var Offre = require('../models/offre');
var jwt = require('jsonwebtoken'); //token
var ObjectId = require('mongoose').Types.ObjectId;


//REGISTRE
router.post('/',verifyToken, function(req,res,next) {
    var offre = new Offre({
      id_poste: req.body.id_poste,
      id_user: req.body.id_user,
      categorie1: req.body.categorie1,
      description: req.body.description,
      titre: req.body.titre,
      phone: req.body.phone,
      gain: req.body.gain,
      indication: req.body.indication,
      vue: req.body.vue,
      date: Date.now()
     
    });
  
    let promise = offre.save();
    promise.then(function(doc) {
        return res.status(201).json(doc);
    });
  
    promise.catch(function(err){
      return res.status(201).json({message: 'Error registering post.'})
    });
  });

//GET BY ID
  router.get('/:id',verifyToken,function(req, res){ //READ BY ID

    let promise = Offre.findOne({id_user:req.params.id}).exec();
    promise.then(function(doc) {
        return res.send(doc);;
    });
    promise.catch(function(err){
        return res.status(201).json({message: 'Error registering user.'})
    });
  });

  //UPDATE
  
router.put('/:id',verifyToken, function(req, res) { //UPDATE BY ID
    if(!ObjectId.isValid(req.params.id)) //if id is-valid
        return res.status(400).send(`No record with given id : + ${req.params.id}`);
  
        var offre = new Offre({
            id_poste: req.body.id_poste,
            id_user: req.body.id_user,
            categorie1: req.body.categorie1,
            description: req.body.description,
            titre: req.body.titre,
            phone: req.body.phone,
            gain: req.body.gain,
            indication: req.body.indication,
            vue: req.body.vue,
            date: Date.now()
           
          });
  
        Offre.findByIdAndUpdate(req.params.id, { $set: offre }, { new: true }, (err,doc) => {
        if(!err) { return res.send(doc); }
        else { console.log('Error in Poste Update: ' + JSON.stringify(err,undefined,2)); }
    });
  });
  //VERIFY TOKEN
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