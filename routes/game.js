var locations = require('../models/locations');
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET game interface. */
router.get('/game', function(req, res, next) {
  res.render('game');
});

/* GET new location. */
router.get('/game', function(req, res, next){
  console.log('loading area');
  res.send(locations);
});


module.exports = router;
