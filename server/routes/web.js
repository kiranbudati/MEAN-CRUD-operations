var express = require("express");
var router = express.Router();
var path = require('path');

var absPath = path.join(__dirname,"../../app.html");

//home page

router.get("/",function(req,res,next) {
	res.sendFile(absPath+"/app.html");
});

module.exports = router;