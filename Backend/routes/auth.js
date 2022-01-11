const express=require("express");
const router=express.Router();
const { body } = require("express-validator/check");
const User=require("../Modules/User");

const AuthController=require('../Controllers/AuthController');

router.post("/signup",[
    body("email").isEmail().withMessage("Please enter a valid email.")
    .custom(async(value,{req})=>{
        return User.findOne({"email":value}).then(userDoc=>{
            if(userDoc){
                return Promise.reject("Email address already exists!");
            }
        })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:7}),
    body('username').trim().not().isEmpty()

],AuthController.signupHandler);

router.post("/login",[
    body("email").isEmail().withMessage("Please enter a valid email")
    .custom(async(value,{req})=>{
        return User.findOne({email:value}).then(userDoc=>{
            if(!userDoc){
                return Promise.reject("User Doesn't exits!");
            }
        })
    }).normalizeEmail(),
    body("password").isLength({'min':7})
],AuthController.LoginHandler)

module.exports=router;