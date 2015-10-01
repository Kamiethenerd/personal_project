var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a Mongoose Schema
var saveDataSchema = new schema({
    xp: {type:Number},
    strength: {type:Number},
    defense: {type:Number},
    currentLvl: {type:Number},
    backpack: {type:Array},
    area: {type:Number},
    code: {type:String}
});

var Save = mongoose.model('Save', saveDataSchema);

// makes the model available to the node application
module.exports = Save;