var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Acme = require('../models/Acme.js');



router.post('/', function(req, res, next) {
  Acme.create(req.body, function (err, post) {
    if (err) {
		res.end("Error inserting : " + err);
		return next(err);
	}
    res.json(post);
  });
});


router.get('/', function(req, res, next) {
  Acme.find(function (err, products) {
    if (err) {
		console.log("WHAT THE FUCK\n");
		res.send("ERROR");
		return next(err);
	}
    res.json(products);
  });
});

router.get('/:id', function(req, res, next) {
  Acme.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Acme.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Acme.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
