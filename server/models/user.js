var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = mongoose.Schema.ObjectId;

var userSchema = new Schema({
	_id : {type : objectId,auto:true},
	name : {type : String,required:true},
	contactNo : {type:String,required:true},
	address : {type:String,required:true}

},{
	versionKey : false
});

var user = mongoose.model('user',userSchema);

module.exports = user;