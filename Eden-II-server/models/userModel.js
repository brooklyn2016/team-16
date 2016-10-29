var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({	'username' : String,	'password' : String,	'firstName' : String,	'lastName' : String,	'phone' : Number,	'parents' : Array,	'participants' : Array,	'caretakers' : Array,	'groupHome' : {	 	type: Schema.Types.ObjectId,	 	ref: 'groupHome'	}});

module.exports = mongoose.model('user', userSchema);
