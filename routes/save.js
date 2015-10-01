var express = require('express');
var router = express.Router();
var Save = require('../models/save');
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/Game!');

//var schema = new mongoose.Schema({
//    xp: number,
//    strength: number,
//    defense: number,
//    currentLvl: number,
//    backpack: array,
//    area: number,
//    code: number
//});
router.get('/:code',function(req,res,next){
    console.log(req.params.code);
    return Save.findOne({'code':req.params.code}).exec(function(err, saves){
        if(err) {
            throw err;
        } else{
            res.send(JSON.stringify(saves));
        }
    });
});

router.post('/', function(req,res,next){
    Save.create(req.body, function (err, saves) {
        if(err){
            res.status(400).send(err.message);
        } else{
            res.sendStatus(200);
        }
    })
});

module.exports = router;