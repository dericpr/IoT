var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Acme = require('../models/Acme.js');
const io = require('socket.io-client');
const socket = io.connect('http://dashboard:4000', {reconnect: true});

function sendUpdate()
{
 
  console.log("Send UPdate called!");
  var devList = Acme.find(function (err,products) {
    if (err) {
      socket.emit("error", "{message : 'Error "+err+"");
    } else {
      socket.emit("device_list", JSON.stringify(products));
    }

  });
}

router.post('/', function(req, res, next) {
  Acme.create(req.body, function (err, post) {
    if (err) {
		res.end("Error inserting : " + err);
		return next(err);
  }
    sendUpdate();
    res.json(post);
  });
});


router.get('/', function(req, res, next) {
  Acme.find(function (err, products) {
    if (err) {
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
    sendUpdate();
  });
});

router.delete('/:id', function(req, res, next) {
  Acme.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    sendUpdate();
  });
});


module.exports = router;
module.exports.start = function() {
    socket.on('get_devices', function() {
      sendUpdate();     
    });
  }
module.exports.sendUpdate = sendUpdate;


  