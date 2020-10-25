var express = require('express');
var router = express.Router();
var Poster = require('../models/poster');
var jwt = require('jsonwebtoken'); //token
var ObjectId = require('mongoose').Types.ObjectId;
//REGISTRE
router.post('/poster',verifyToken, function(req,res,next) {
  var poster = new Poster({
    id_user: req.body.id_user,
    adresse: req.body.adresse,
    budjet: req.body.budjet,
    categorie1: req.body.categorie1,
    categorie2: req.body.categorie2,
    description: req.body.description,
    personne: req.body.personne,
    titre: req.body.titre,
    phone: req.body.phone,
    datejob: req.body.datejob,
    date: Date.now()
   
  });

  let promise = poster.save();
  promise.then(function(doc) {
      return res.status(201).json(doc);
  });

  promise.catch(function(err){
    return res.status(201).json({message: 'Error registering post.'})
  });
});

router.get('/',verifyToken, function(req,res) { //READ
    Poster.find((err,docs)=> {
        if(!err) { res.send(docs); }
        else { return res.status(201).json({message: 'Error registering post.'}) }
  
    });
});
router.get('/free', function(req,res) { //READ
  Poster.find((err,docs)=> {
      if(!err) { res.send(docs); }
      else { return res.status(201).json({message: 'Error registering post.'}) }

  });
});
router.get('/getById/:id',verifyToken,function(req, res){ //READ BY ID
  if(!ObjectId.isValid(req.params.id)) //if id is-valid
      return res.status(400).send(`No record with given id : + ${req.params.id}`);
  
      Poster.findById(req.params.id, (err, doc) => {
      if(!err) { return res.send(doc); }
      else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/:id',verifyToken, function(req, res) { //UPDATE BY ID
  if(!ObjectId.isValid(req.params.id)) //if id is-valid
      return res.status(400).send(`No record with given id : + ${req.params.id}`);

  var poster = {
    id_user: req.body.id_user,
    adresse: req.body.adresse,
    budjet: req.body.budjet,
    categorie1: req.body.categorie1,
    categorie2: req.body.categorie2,
    description: req.body.description,
    personne: req.body.personne,
    titre: req.body.titre,
    phone: req.body.phone,
    datejob: req.body.datejob,
    date: Date.now()
  };

  Poster.findByIdAndUpdate(req.params.id, { $set: poster }, { new: true }, (err,doc) => {
      if(!err) { return res.send(doc); }
      else { console.log('Error in Poste Update: ' + JSON.stringify(err,undefined,2)); }
  });
});

//VERIFY TOKEN
router.delete('/delete/:id',verifyToken, function(req,res) { //DELETE BY ID
  if(!ObjectId.isValid(req.params.id)) //if id is-valid
      return res.status(400).send(`No record with given id : + ${req.params.id}`);
  
      Poster.findByIdAndRemove(req.params.id, (err,doc) => {
      if(!err) { return res.send(doc); }
      else { console.log('Error in Employee Delete: ' + JSON.stringify(err,undefined,2)); }
  });
})
  

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
