var express = require('express');
var router = express.Router();

router.use("/user",require("../controller/user.api"));

module.exports = router;