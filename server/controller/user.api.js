var express = require("express");
var router = express.Router();
var user = require('../models/user.js');

router.get("/",function(req,res) {
	user.find({},function(err,data){
		if(err){
			res.send("error "+err);
			return;
		}
		res.send(data);
	});
});

router.get("/:id",function(req,res){
	
	//getting values from url	
	var id = req.params.id;

	user.find({_id:id},function(err,data){
		if(err){
			res.send("error "+err);
			return;
		}
		res.send(data[0]);
	});
});

router.post("/",function(req,res){
	var obj = req.body;
	var model = new user(obj);

	model.save(function(err){
		if(err){
			res.send("error "+err);
			return;
		}
		res.send("created");
	});
});

router.put("/:id",function(req,res){
	var id = req.params.id;
	var obj = req.body;

	user.findByIdAndUpdate(
		id,
		{name:obj.name,contactNo:obj.contactNo,address:obj.address},
		function(err){
			if(err){
				res.send("error "+err);
				return;
			}
			res.send("updated");
	});
});

router.delete("/:id",function(req,res){
	var id = req.params.id;
	user.findByIdAndRemove(
		id,
		function(err){
			if(err){
				res.send("error "+err);
				return;
			}
			res.send("deleted");
	}); 
});

module.exports = router;

