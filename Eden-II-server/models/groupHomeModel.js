var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var groupHomeSchema = new Schema({	'name' : String,	'address' : String,	'phone' : Number,	'caretakers' : Array,	'participants' : Array});

module.exports = mongoose.model('groupHome', groupHomeSchema);
