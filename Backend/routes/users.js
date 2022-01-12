var express = require('express');
var router = express.Router();
const {body}=require("express-validator");
const UserController=require("../Controllers/UserController");
/* GET users listing. */
router.post('/getUserData',UserController.getUserData);

module.exports = router;
