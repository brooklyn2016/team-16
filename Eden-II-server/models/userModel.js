var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({	'username' : String,	'password' : String,	'firstName' : String,	'lastName' : String,	'phone' : Number,	'category' : String,	'parent' : Array,	'participant' : Array,	'groupHome' : {	 	type: Schema.Types.ObjectId,	 	ref: 'groupHome'	},	'caretaker' : Array});

module.exports = mongoose.model('user', userSchema);
